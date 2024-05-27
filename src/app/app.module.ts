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
import { PosteDeTravailAddComponent } from './forms/candidature/poste-de-travail/poste-de-travail.component';
import { AddComponent } from './components/Buttons/add/add.component';
import { SubmitComponent } from './components/Buttons/submit/submit.component';
import { ViewComponent } from './components/Buttons/view/view.component';
import { UpdateComponent } from './components/Buttons/update/update.component';
import { DeleteComponent } from './components/Buttons/delete/delete.component';
import { PosteDeTravailFicheComponent } from './components/candidature/fiche/poste-de-travail-fiche/poste-de-travail-fiche.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { AnnulerComponent } from './components/Buttons/annuler/annuler.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SessionCandidatureFicheComponent } from './components/candidature/session-candidature-fiche/session-candidature-fiche.component';
import { SaveSessionCandidatureComponent } from './forms/candidature/save-session-candidature/save-session-candidature.component';
import { RetourComponent } from './components/Buttons/retour/retour.component';
import { VoirComponent } from './components/Buttons/voir/voir.component';
import { SavePosteVacantComponent } from './forms/candidature/save-poste-vacant/save-poste-vacant.component';
import { FichePosteVacantComponent } from './components/candidature/fiche/fiche-poste-vacant/fiche-poste-vacant.component';
import { OffreDeTravailComponent } from './pages/utilisateur/offre-de-travail/offre-de-travail.component';
import { DetailOffreComponent } from './pages/utilisateur/detail-offre/detail-offre.component';
import { SaveNomDocumentComponent } from './forms/candidature/save-nom-document/save-nom-document.component';
import { SaveDocumentCandidatureComponent } from './forms/candidature/save-document-candidature/save-document-candidature.component';
import { AComponent } from './forms/candidature/a/a.component';

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
    //*************************************candidature
    //1- etat candidture
    EtatCandidatureComponent,
    //2- candidture
    CandidatureComponent,
    //3- document candidture
    DocumentCandidatureComponent,
    //4- nom document
    NomDocumentComponent,
    //5- poste de travail
    PosteDeTravailComponent,
    PosteDeTravailAddComponent,
    PosteDeTravailFicheComponent,
    //5- poste vacant
    PosteVacantComponent,
    SavePosteVacantComponent,
    FichePosteVacantComponent,
    //6- session candidature
    SessionCandidatureComponent,
    SessionCandidatureFicheComponent,
    SaveSessionCandidatureComponent,
    //7- boutons
    AddComponent,
    SubmitComponent,
    ViewComponent,
    UpdateComponent,
    DeleteComponent,
    AnnulerComponent,
    RetourComponent,
    VoirComponent,
    OffreDeTravailComponent,
    DetailOffreComponent,
    SaveNomDocumentComponent,
    SaveDocumentCandidatureComponent,
    AComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgConfirmModule,
    NgxPaginationModule

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
