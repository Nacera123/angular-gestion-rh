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


const routes: Routes = [
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
  { path: 'document-candidature', component: DocumentCandidatureComponent },
  { path: 'app-candidature', component: CandidatureComponent },
  { path: 'nom-document', component: NomDocumentComponent },
  //1-poste de travail

  { path: 'session-candidature', component: SessionCandidatureComponent },
  { path: 'poste-de-travail-fiche', component: PosteDeTravailFicheComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'type-contrat', component: TypeContratComponent },
      { path: 'etat-candidature', component: EtatCandidatureComponent },
      { path: 'poste-de-travail', component: PosteDeTravailComponent },
      { path: 'poste-de-travail/add', component: PosteDeTravailAddComponent },
      { path: 'poste-de-travail/edit/:id', component: PosteDeTravailAddComponent }
    ]
  },




];




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
