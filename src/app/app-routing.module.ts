import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//pages
import { HomeComponent } from './pages/general/home/home.component';
import { RegisterComponent } from './forms/user/register/register.component';
import { LoginComponent } from './forms/user/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './pages/general/admin/admin.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { SidebarAdminComponent } from './components/admin/sidebar-admin/sidebar-admin.component';
import { FooterAdminComponent } from './components/admin/footer-admin/footer-admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestComponent } from './pages/specific/test/test.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { TypeContratComponent } from './pages/general/candidature/type-contrat/type-contrat.component';
import { EtatCandidatureComponent } from './pages/general/candidature/etat-candidature/etat-candidature.component';
import { DocumentCandidatureComponent } from './pages/general/candidature/document-candidature/document-candidature.component';
import { CandidatureComponent } from './pages/general/candidature/candidature/candidature.component';
import { NomDocumentComponent } from './pages/general/candidature/nom-document/nom-document.component';
import { PosteDeTravailComponent } from './pages/general/candidature/poste-de-travail/poste-de-travail.component';
import { SessionCandidatureComponent } from './pages/general/candidature/session-candidature/session-candidature.component';
import { PosteDeTravailAddComponent } from './forms/candidature/poste-de-travail/poste-de-travail.component';
import { PosteDeTravailFicheComponent } from './components/candidature/fiche/poste-de-travail-fiche/poste-de-travail-fiche.component';
import { SaveSessionCandidatureComponent } from './forms/candidature/save-session-candidature/save-session-candidature.component';
import { PosteVacantComponent } from './pages/general/candidature/poste-vacant/poste-vacant.component';
import { SessionCandidatureFicheComponent } from './components/candidature/session-candidature-fiche/session-candidature-fiche.component';
import { SavePosteVacantComponent } from './forms/candidature/save-poste-vacant/save-poste-vacant.component';
import { FichePosteVacantComponent } from './components/candidature/fiche/fiche-poste-vacant/fiche-poste-vacant.component';
import { OffreDeTravailComponent } from './pages/utilisateur/offre-de-travail/offre-de-travail.component';
import { DetailOffreComponent } from './pages/utilisateur/detail-offre/detail-offre.component';
import { SaveNomDocumentComponent } from './forms/candidature/save-nom-document/save-nom-document.component';
import { SaveDocumentCandidatureComponent } from './forms/candidature/save-document-candidature/save-document-candidature.component';
import { AComponent } from './forms/candidature/a/a.component';
import { BComponent } from './forms/candidature/b/b.component';
import { IndividuUserComponent } from './forms/user/individu-user/individu-user.component';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MonDocTestComponent } from './forms/mon-doc-test/mon-doc-test.component';
import { PagePersonnelleComponent } from './pages/utilisateur/page-personnelle/page-personnelle.component';
import { Test1Component } from './test/test1/test1.component';
import { CandidaturesComponent } from './pages/general/candidature/candidatures/candidatures.component';
import { FicheDocumentCandidatureComponent } from './components/candidature/fiche/fiche-document-candidature/fiche-document-candidature.component';
import { FicheCandidatureComponent } from './components/candidature/fiche/fiche-candidature/fiche-candidature.component';
import { StatusCandidatComponent } from './forms/candidature/status-candidat/status-candidat.component';


const routes: Routes = [
  ///test
  { path: 'test1', component: Test1Component },
  /**************** */
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'header-admin', component: HeaderAdminComponent },
  { path: 'sidebar', component: SidebarAdminComponent },
  { path: 'footer-admin', component: FooterAdminComponent },
  { path: 'test', component: TestComponent },

  //candidature
  { path: 'offre', component: OffreDeTravailComponent },
  { path: 'offre/dtail/:id', component: DetailOffreComponent },
  //candidater
  { path: 'a/:id', component: AComponent },
  { path: 'b/:id', component: BComponent },
  { path: 'individu/register/:id', component: IndividuUserComponent },
  { path: 'save-document-candidature/:id', component: SaveDocumentCandidatureComponent },
  { path: 'mon-doc-test/:id', component: MonDocTestComponent },

  //page personnelle candidat
  { path: 'mon-espace', component: PagePersonnelleComponent, canActivate: [AuthGuard] },



  //1-poste de travail

  // Admin
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'type-contrat', component: TypeContratComponent },
      { path: 'etat-candidature', component: EtatCandidatureComponent },
      //poste de travail
      { path: 'poste-de-travail', component: PosteDeTravailComponent },
      { path: 'poste-de-travail/add', component: PosteDeTravailAddComponent },
      { path: 'poste-de-travail/edit/:id', component: PosteDeTravailAddComponent },
      { path: 'poste-de-travail/fiche/:id', component: PosteDeTravailFicheComponent },
      { path: 'poste-de-travail-fiche', component: PosteDeTravailFicheComponent },


      //session candidature
      { path: 'session-candidature', component: SessionCandidatureComponent },
      { path: 'session-candidature/fiche/:id', component: SessionCandidatureFicheComponent },
      { path: 'session-candidature/add', component: SaveSessionCandidatureComponent },
      { path: 'session-candidature/edit/:id', component: SaveSessionCandidatureComponent },
      //candidature
      { path: 'candidatures', component: CandidaturesComponent },
      { path: 'candidature/:nom', component: CandidatureComponent },
      { path: 'candidature/fiche/:id', component: FicheCandidatureComponent },
      //document candidature
      { path: 'document-candidature', component: DocumentCandidatureComponent },
      { path: 'fiche-document-candidature/:id', component: FicheDocumentCandidatureComponent },
      //nom des documents
      { path: 'nom-document', component: NomDocumentComponent },
      { path: 'nom-document/add', component: SaveNomDocumentComponent },
      { path: 'nom-document/edit/:id', component: SaveNomDocumentComponent },
      //poste de travail vaccant 
      { path: 'poste-vacant', component: PosteVacantComponent },
      { path: 'poste-vacant/add', component: SavePosteVacantComponent },
      { path: 'poste-vacant/fiche/:id', component: FichePosteVacantComponent },
      { path: 'poste-vacant/edit/:id', component: SavePosteVacantComponent },
      //status candidature
      { path: 'status-candidat/:id', component: StatusCandidatComponent },

    ]
  },




];




@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forRoot(routes),
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
