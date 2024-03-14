import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';

//pages
import { RegisterComponent } from './pages/user/register/register.component';
import { HomeComponent } from './pages/general/home/home.component';

//locale
import * as fr from '@angular/common/locales/fr';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/user/login/login.component';
import { EtatCandidatureComponent } from './components/candidature/etat-candidature/etat-candidature.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoggInComponent } from './components/logg-in/logg-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './forms/sign-in/sign-in.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';

//http client


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    EtatCandidatureComponent,
    HeaderComponent,
    FooterComponent,
    LoggInComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    registerLocaleData(fr.default)
  }

}
