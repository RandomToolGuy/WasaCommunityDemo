// =============================
// Email: isak.vidinghoff@gmail.com
// www.isakvidinghoff.com
// =============================

import { Injectable } from '@angular/core';

import { AppTheme } from '../models/AppTheme';

@Injectable()
export class ThemeManager {
  themes: Array<AppTheme> = [
    {
      id: 1,
      name: 'Classic Light',
      primary: '#0d47a1',
      accent: '#fbc02d',
      href: 'wasa-classic-light.css',
      isDark: false,
      isDefault: true,
    },
    {
      id: 2,
      name: 'Classic Dark',
      primary: '#fbc02d',
      accent: '#0d47a1',
      href: 'wasa-classic-dark.css',
      isDark: true,
    },
    {
      id: 3,
      name: 'Modern Pink',
      primary: '#E91E63',
      accent: '#607D8B',
      href: 'wasa-pink-bluegrey.css',
      isDark: true,
    },
    {
      id: 4,
      name: 'Dark Brown',
      primary: '#5d4037',
      accent: '#795548',
      href: 'wasa-brown-grey.css',
      isDark: true,
    },
  ];

  public installTheme(theme: AppTheme) {
    if (theme == null || theme.isDefault) {
      this.removeStyle('theme');
    }
    else {
      this.setStyle('theme', `assets/themes/${theme.href}`);
    }
  }

  public getThemeByID(id: number): AppTheme {
    return this.themes.find(theme => theme.id === id);
  }

  private setStyle(key: string, href: string) {
    this.getLinkElementForKey(key).setAttribute('href', href);
  }

  private removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(key: string) {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  private getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
  }

  private createLinkElementWithKey(key: string) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  private getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }
}
