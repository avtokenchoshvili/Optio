import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { MaterialModuleModule } from './material-module/material-module.module';
import { AddUserFromComponent } from './components/addUserForm/addUserFrom.component';
import { ReactiveFormsModule } from '@angular/forms';
import {UsersTableComponent} from "./components/usersTable/usersTable.component";

@NgModule({
  declarations: [
    AppComponent,
    AddUserFromComponent,
    UsersTableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    ReactiveFormsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
