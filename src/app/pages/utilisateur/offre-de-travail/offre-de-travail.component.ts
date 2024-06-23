import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PosteDeTravail } from 'src/app/models/candidature/posteDeTravail';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { TypeDeContrat } from 'src/app/models/candidature/typeDeContrat';
import { PosteDeTravailService } from 'src/app/services/candidature/poste-de-travail.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { TypeDeContratService } from 'src/app/services/candidature/type-de-contrat.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-offre-de-travail',
  templateUrl: './offre-de-travail.component.html',
  styleUrls: ['./offre-de-travail.component.css', './bootstrap.min.css']


})
export class OffreDeTravailComponent implements OnInit {


  filteredPostesVacants: PosteVacant[] = [];
  posteV: PosteVacant = new PosteVacant()
  tabPosteVacant: String[] = [];

  errorMessage: string = '';
  posteSelectionne: PosteVacant | undefined;
  safeHtml: SafeHtml = '';




  //recuperer les objets du filtre par :
  // 1- type de contrat
  typeContrat: TypeDeContrat = new TypeDeContrat();
  tabTypeContrat: String[] = [];



  // 2 - poste de travail
  poste: PosteDeTravail = new PosteDeTravail();
  tabPooste: String[] = [];
  filteredTabPoste: String[] = [];





  postesVacants: PosteVacant[] = [];

  constructor(
    private posteVacantService: PosteVacantService,
    private routeActivated: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private typeContratService: TypeDeContratService,
    private posteTravailService: PosteDeTravailService,

  ) { }

  ngOnInit(): void {
    this.fetchInitialData();
    this.fetchPostesVacants();



    this.typeContratService.getAll().subscribe(
      (response) => {

        this.tabTypeContrat = response
          .filter(response => response.type !== undefined)
          .map(response => response.type!)



      }

    )



    this.posteTravailService.getAll().subscribe(
      (response) =>
        this.tabPooste = response
          .filter(response => response.nom !== undefined)
          .map(response => response.nom!)

    )

    // this.getPosteVacantById;

    this.posteVacantService.getAll().subscribe(
      (response) =>
        this.tabPosteVacant = response
          .filter(response => response.nom !== undefined)
          .map(response => response.nom!)

    )




  }


  fetchInitialData(): void {
    forkJoin([
      this.typeContratService.getAll(),
      this.posteTravailService.getAll(),
      this.posteVacantService.getAll()
    ]).subscribe(
      ([typeContratResponse, posteTravailResponse, posteVacantResponse]) => {
        this.tabTypeContrat = typeContratResponse
          .filter(response => response.type !== undefined)
          .map(response => response.type!);

        this.tabPooste = posteTravailResponse
          .filter(response => response.nom !== undefined)
          .map(response => response.nom!);

        this.tabPosteVacant = posteVacantResponse
          .filter(response => response.nom !== undefined)
          .map(response => response.nom!);

        // Maintenant que toutes les données sont récupérées, appelez filterAll()
        this.filterAll();
      },
      (error) => {
        console.error(error);
        this.errorMessage = error;
      }
    );
  }

  fetchPostesVacants(): void {
    this.posteVacantService.getAll()
      .subscribe(
        postes => {
          this.postesVacants = postes;
          this.filteredPostesVacants = postes;

          console.log(postes);

        },
        (error) => {
          console.error(error);
          this.errorMessage = error;

        }
      );
  }

  filterByTypeContrat(): void {

    if (this.typeContrat.type) {
      console.log('toto');
      this.filteredPostesVacants = this.postesVacants.filter(poste => poste.typeContrat?.type === this.typeContrat.type);
    } else {
      console.log('titi');

      this.filteredPostesVacants = this.postesVacants;
    }
  }





  filterByTypePoste(): void {
    if (this.poste.nom) {
      this.filteredPostesVacants = this.postesVacants.filter(poste => poste.poste?.nom == this.poste.nom);
    } else {
      this.filteredPostesVacants = this.postesVacants;
    }
  }
  filterByTypePosteVacant(): void {
    console.log('step1');

    if (this.posteV.nom) {
      this.filteredPostesVacants = this.postesVacants.filter(poste => poste.nom == this.posteV.nom);
    } else {
      this.filteredPostesVacants = this.postesVacants;
    }
  }





  filterAll(): void {
    let filtered = this.postesVacants;

    if (this.typeContrat.type && this.typeContrat.type !== 'tout contrat') {
      console.log(1);

      filtered = filtered.filter(poste => poste.typeContrat?.type === this.typeContrat.type);
    }

    if (this.poste.nom && this.poste.nom !== 'par metier') {
      filtered = filtered.filter(poste => poste.poste?.nom === this.poste.nom);
    }

    if (this.posteV.nom && this.posteV.nom !== 'poste disponible') {
      filtered = filtered.filter(poste => poste.nom === this.posteV.nom);
    }

    this.filteredPostesVacants = filtered;




    // Mise à jour de filteredTabPoste
    this.filteredTabPoste = filtered.reduce((acc: String[], poste) => {
      if (poste.poste?.nom && !acc.includes(poste.poste.nom)) {
        acc.push(poste.poste.nom);
      }
      return acc;
    }, []);

    // Réinitialiser le poste sélectionné
    this.poste.nom = '';

    this.filteredPostesVacants = filtered;
  }



  // pagination 
  pageSize = 5;

  currentPage = 1;


  pageChanged(event: any): void {
    console.log('1');

    this.currentPage = event;
  }

}








