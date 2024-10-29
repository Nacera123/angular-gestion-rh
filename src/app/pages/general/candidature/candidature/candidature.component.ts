import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidature } from 'src/app/models/candidature/candidature';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  candidature: Candidature[] = [];



  errorMessage: string = '';

  constructor(
    private candidatureService: CandidatureService,
    private route: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const nomPoste = params.get('nom');
      if (nomPoste) {
        // const formattedNom = this.cleanNameForUrl(nomPoste);
        const formattedNom = nomPoste.replace(/-/g, ' ');
        this.getCandidatureByNomPoste(formattedNom);
        console.log('Nom du poste récupéré des paramètres de l\'URL:', formattedNom);
      } else {
        this.getAllCandidature();
      }
    });
  }
  cleanNameForUrl(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')  // Remplace les espaces par des tirets
      .replace(/[^\w-]/g, '');  // Supprime les caractères non-alphanumériques sauf les tirets
  }
  // this.getAllCandidature();

  getAllCandidature() {

    this.candidatureService.getAll()
      .subscribe(
        response => {
          this.candidature = response;
          console.log(response);

        },
        (error) => {
          console.error(error);
          this.errorMessage = error;

        }
      )
  }

  getCandidatureByNomPoste(nom: string) {
    this.candidatureService.getByNomPosteVacant(nom)
      .subscribe(
        response => {
          this.candidature = response;
          console.log(response);
        },
        error => {
          console.error(error);
          this.errorMessage = error;
        }
      );
  }

  // pagination 
  pageSize = 5;

  currentPage = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }


}
