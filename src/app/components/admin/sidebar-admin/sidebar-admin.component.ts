import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {
  ngOnInit(): void {
  }


  constructor(private router: Router) {
  }

  sidebarLinks = [
    {
      label: 'Dashboard',
      icon: 'bi-grid',
      route: 'admin',
      collapse: '',
      expanded: false
    },
    {
      label: 'Emplois & Postes', icon: 'bi-menu-button-wide', collapse: 'emplois', expanded: true,
      children: [
        { label: 'Poste de Travail', route: '/admin/poste-de-travail' },
        { label: 'Poste de Vaccant', route: '/admin/poste-vacant' },
      ]
    },
    {
      label: 'Gestion des Candidatures', icon: 'bi-journal-text', collapse: 'form', expanded: true,
      children: [
        { label: 'Type de contrat', route: '/admin/type-contrat' },
        { label: 'Etat de candidature', route: '/admin/etat-candidature' },
        { label: 'Session de candidature', route: '/admin/session-candidature' },
        { label: 'Candidatures', route: '/admin/candidature' },
        { label: 'Document candidature', route: '/admin/document-candidature' },
        { label: 'Noms des documents', route: '/admin/nom-document' },
      ]
    },
    {
      label: 'Tables', icon: 'bi-layout-text-window-reverse', collapse: 'tableau', expanded: true,
      children: [
        { label: 'General Tables', route: '/admin/tables/general' },
        { label: 'Data Tables', route: '/admin/tables/data' },
      ]
    }
  ];



  toggleCollapse(link: any): void {
    link.expanded = !link.expanded;
  }




  // public menuProperties = [
  //   {
  //     id: '1',
  //     titre: 'Dashboard',
  //     icon: 'bi bi-grid',
  //     souTitre: 'dashboard-nav',
  //     url: 'admin',
  //     chevron: ''

  //   },
  //   {
  //     id: '2',
  //     titre: 'Articles',
  //     souTitre: 'article-nav',
  //     icon: 'bi bi-boxes',
  //     url: '',
  //     chevron: 'bi bi-chevron-down ms-auto',


  //     sousMenu: [
  //       {
  //         id: '21',
  //         titre: 'Articles',
  //         icon: 'bi bi-boxes',
  //         url: 'type-contrat'
  //       }
  //     ]
  //   },

  //   {
  //     id: '3',
  //     titre: 'register',
  //     souTitre: 'article-nav',
  //     icon: 'bi bi-boxes',
  //     url: '',
  //     chevron: 'bi bi-chevron-down ms-auto',


  //     sousMenu: [
  //       {
  //         id: '21',
  //         titre: 'register',
  //         icon: 'bi bi-boxes',
  //         url: 'navbar'
  //       }
  //     ]
  //   },


  // ];




  // navigate(url: string): void {

  //   this.router.navigate([url]);
  // }
}
