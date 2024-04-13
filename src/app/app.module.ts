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
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { SidebarAdminComponent } from './components/admin/sidebar-admin/sidebar-admin.component';
import { FooterAdminComponent } from './components/admin/footer-admin/footer-admin.component';
import { AdminComponent } from './pages/general/admin/admin.component';
import { TestComponent } from './pages/specific/test/test.component';
import { TypeContratComponent } from './pages/general/candidature/type-contrat/type-contrat.component';
import { NavTabComponent } from './components/admin/nav-tab/nav-tab.component';
import { EtatCandidatureComponent } from './pages/general/candidature/etat-candidature/etat-candidature.component';
import { CandidatureComponent } from './pages/general/candidature/candidature/candidature.component';
import { DocumentCandidatureComponent } from './pages/general/candidature/document-candidature/document-candidature.component';
import { NomDocumentComponent } from './pages/general/candidature/nom-document/nom-document.component';
import { PosteDeTravailComponent } from './pages/general/candidature/poste-de-travail/poste-de-travail.component';
import { PosteVacantComponent } from './pages/general/candidature/poste-vacant/poste-vacant.component';
import { SessionCandidatureComponent } from './pages/general/candidature/session-candidature/session-candidature.component';

//http client


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterAdminComponent,
    AdminComponent,
    TestComponent,
    TypeContratComponent,
    NavTabComponent,
    //candidature
    EtatCandidatureComponent,
    CandidatureComponent,
    DocumentCandidatureComponent,
    NomDocumentComponent,
    PosteDeTravailComponent,
    PosteVacantComponent,
    SessionCandidatureComponent
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
