import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';

//pages
import { RegisterComponent } from './forms/user/register/register.component';
import { HomeComponent } from './pages/general/home/home.component';

//locale
import * as fr from '@angular/common/locales/fr';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './forms/user/login/login.component';
import { EtatCandidatureComponent } from './components/candidature/etat-candidature/etat-candidature.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { SidebarAdminComponent } from './components/admin/sidebar-admin/sidebar-admin.component';
import { FooterAdminComponent } from './components/admin/footer-admin/footer-admin.component';
import { AdminComponent } from './pages/general/admin/admin.component';
import { TestComponent } from './pages/specific/test/test.component';

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
    NavbarComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterAdminComponent,
    AdminComponent,
    TestComponent
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
