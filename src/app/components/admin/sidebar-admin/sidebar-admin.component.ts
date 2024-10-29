import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidature } from 'src/app/models/candidature/candidature';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { SidebarService } from 'src/app/sidebar.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {

  isSidebarOpen = true;


  posteVancant: PosteVacant = new PosteVacant
  nomPosteVacanttab: String[] = [];


  candidature: Candidature[] = [];
  candidatureTab: String[] = [];


  constructor(private router: Router,
    private posteVacantService: PosteVacantService,
    private candidatureService: CandidatureService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {

    this.sidebarService.sidebarStatus$.subscribe(status => {
      this.isSidebarOpen = status;
    });

    this.posteVacantService.getAll().subscribe(
      response => {
        this.nomPosteVacanttab = response
          .filter(data => data.nom !== undefined)
          .map(data => data.nom!)
        console.log('les poste vacanat', response);
        console.log('Noms des postes vacants :', this.nomPosteVacanttab);
        this.updateSidebarLinks();

      }
    )
    this.candidatureService.getAll().subscribe(
      response => {
        this.candidatureTab = response
          .filter(data => data.posteVacant?.nom !== undefined)
          .map(data => data.posteVacant?.nom!)
        console.log('les poste vacanat', response);
        console.log('Noms des postes vacants :', this.nomPosteVacanttab);
        this.updateSidebarLinks();

      }
    )
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
        { label: 'Type de contrat', route: '/admin/type-contrat' },
      ]
    },
    {
      label: 'Gestion des Candidatures', icon: 'bi-journal-text', collapse: 'form', expanded: true,
      children: [
        { label: 'Toute les candidature', route: '/admin/candidatures' },
        { label: 'Session de candidature', route: '/admin/session-candidature' },
        { label: 'Noms des documents', route: '/admin/nom-document' },
        { label: 'Etat de candidature', route: '/admin/etat-candidature' },
        // { label: 'Candidatures', route: '/admin/candidature' },
        { label: 'Document candidature', route: '/admin/document-candidature' },
        { label: 'save-document-candidature', route: '/admin/save-document-candidature' },
      ]
    },

    {
      label: 'Candidatures', icon: 'bi-layout-text-window-reverse', collapse: 'tableau', expanded: true,
      children: [
        ...this.candidatureTab.map(nom => ({
          label: nom,
          route: '/admin/candidature/' + this.cleanNameForUrl(nom.toString())
        })),
        { label: 'Toute les candidature', route: '/admin/candidatures' },

      ]
    },


  ];



  toggleCollapse(link: any): void {
    link.expanded = !link.expanded;
  }



  updateSidebarLinks(): void {
    const candidaturesSection = this.sidebarLinks.find(link => link.label === 'Candidatures');
    if (candidaturesSection) {
      candidaturesSection.children = this.candidatureTab.map(nom => ({
        label: nom,
        route: '/admin/candidature/' + nom.replace(' ', '-')
      }));
    }
  }


  cleanNameForUrl(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }

}
