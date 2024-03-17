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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'header-admin', component: HeaderAdminComponent },
  { path: 'sidebar', component: SidebarAdminComponent },
  { path: 'footer-admin', component: FooterAdminComponent },
  { path: 'test', component: TestComponent }

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
