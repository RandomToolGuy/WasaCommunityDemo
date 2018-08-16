// =============================
// Email: isak.vidinghoff@gmail.com
// www.isakvidinghoff.com
// =============================

import { Component, ViewChild } from "@angular/core";

import { LoginControlComponent } from './login-control.component';

@Component({
    selector: "app-login",
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent
{
    @ViewChild(LoginControlComponent)
    loginControl: LoginControlComponent;
}
