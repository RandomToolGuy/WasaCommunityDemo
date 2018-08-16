// =============================
// Email: isak.vidinghoff@gmail.com
// www.isakvidinghoff.com
// =============================

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { AppTranslationService } from './app-translation.service';
import { LocalStoreManager } from './local-store-manager.service';
import { DBkeys } from './db-keys';
import { Utilities } from './utilities';
import { environment } from '../../environments/environment';

type UserConfiguration = {
    language: string,
    homeUrl: string,
    themeId: number,
};

@Injectable()
export class ConfigurationService {
    public static readonly appVersion: string = "1.2.0";

    public baseUrl = environment.baseUrl || Utilities.baseUrl();
    public tokenUrl = environment.tokenUrl || environment.baseUrl || Utilities.baseUrl();
    public loginUrl = environment.loginUrl;
    public fallbackBaseUrl = "http://localhost:5000";

    public static readonly defaultLanguage: string = "en";
    public static readonly defaultHomeUrl: string = "/";
    public static readonly defaultThemeId: number = 1;

    private _language: string = null;
    private _homeUrl: string = null;
    private _themeId: number = null;
    private onConfigurationImported: Subject<boolean> = new Subject<boolean>();

    configurationImported$ = this.onConfigurationImported.asObservable();

    constructor(
        private localStorage: LocalStoreManager,
        private translationService: AppTranslationService,
    ) {
        this.loadLocalChanges();
    }

    private loadLocalChanges() {
        if (this.localStorage.exists(DBkeys.LANGUAGE)) {
            this._language = this.localStorage.getDataObject<string>(DBkeys.LANGUAGE);
            this.translationService.changeLanguage(this._language);
        }
        else {
            this.resetLanguage();
        }

        if (this.localStorage.exists(DBkeys.HOME_URL)) {
            this._homeUrl = this.localStorage.getDataObject<string>(DBkeys.HOME_URL);
        }

        if (this.localStorage.exists(DBkeys.THEME_ID)) {
            this._themeId = this.localStorage.getDataObject<number>(DBkeys.THEME_ID);
        }

    }

    private saveToLocalStore(data: any, key: string) {
        setTimeout(() => this.localStorage.savePermanentData(data, key));
    }

    public import(jsonValue: string) {
        this.clearLocalChanges();

        if (jsonValue) {


            let importValue: UserConfiguration = Utilities.JsonTryParse(jsonValue);

            if (importValue.language != null) {
                this.language = importValue.language;
            }

            if (importValue.homeUrl != null) {
                this.homeUrl = importValue.homeUrl;
            }

            if (importValue.themeId != null) {
                this.themeId = importValue.themeId;
            }

        }

        this.onConfigurationImported.next();
    }

    public export(changesOnly = true): string {
        let exportValue: UserConfiguration =
            {
                language: changesOnly ? this._language : this.language,
                homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
                themeId: changesOnly ? this._themeId : this.themeId,
            };

        return JSON.stringify(exportValue);
    }

    public clearLocalChanges() {
        this._language = null;
        this._homeUrl = null;
        this._themeId = null;

        this.localStorage.deleteData(DBkeys.LANGUAGE);
        this.localStorage.deleteData(DBkeys.HOME_URL);
        this.localStorage.deleteData(DBkeys.THEME_ID);

        this.resetLanguage();
    }

    private resetLanguage() {
        let language = this.translationService.useBrowserLanguage();

        if (language) {
            this._language = language;
        }
        else {
            this._language = this.translationService.changeLanguage()
        }
    }

    set language(value: string) {
        this._language = value;
        this.saveToLocalStore(value, DBkeys.LANGUAGE);
        this.translationService.changeLanguage(value);
    }
    get language() {
        return this._language || ConfigurationService.defaultLanguage;
    }

    set homeUrl(value: string) {
        this._homeUrl = value;
        this.saveToLocalStore(value, DBkeys.HOME_URL);
    }
    get homeUrl() {
        return this._homeUrl || ConfigurationService.defaultHomeUrl;
    }

    set themeId(value: number) {
        this._themeId = value;
        this.saveToLocalStore(value, DBkeys.THEME_ID);
    }
    get themeId() {
        return this._themeId || ConfigurationService.defaultThemeId;
    }
}
