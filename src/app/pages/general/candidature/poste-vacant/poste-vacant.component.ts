import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { SessionCandidature } from 'src/app/models/candidature/sessionCandidature';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { SessionCandidatureComponent } from '../session-candidature/session-candidature.component';
import { sessionCandidatureService } from 'src/app/services/candidature/sessionCandidature.service';
import { ActivatedRoute } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-poste-vacant',
  templateUrl: './poste-vacant.component.html',
  styleUrls: ['./poste-vacant.component.css']
})
export class PosteVacantComponent implements OnInit {

  posteVaccant: PosteVacant[] = [];


  errorMessage: string = '';
  posteSelectionne: PosteVacant | undefined;






  postesVacants: PosteVacant[] = [];

  constructor(
    private posteVacantService: PosteVacantService,
    private routeActivated: ActivatedRoute,
    private confirmService: NgConfirmService

  ) { }

  ngOnInit(): void {
    this.fetchPostesVacants();

  }

  fetchPostesVacants(): void {
    this.posteVacantService.getAll()
      .subscribe(
        postes => {
          this.postesVacants = postes;
          console.log(postes);

        },
        (error) => {
          console.error(error);
          this.errorMessage = error;

        }
      );
  }


  getPosteVacantById(id?: Number) {
    console.log(id);
    if (id !== undefined) {

      this.posteVacantService.getById(id).subscribe(
        (response: PosteVacant) => {
          this.posteSelectionne = response
        }
      )
    } else {
      console.log('Id undefined');

    }


  }



  // DELETE
  deletePosteVacant(id?: Number): void {

    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {

        this.posteVacantService.delete(id)
          .subscribe(

            () => {
              console.log('Le poste de travail a été supprimé avec succès.');
              // Mettre à jour les données après la suppression réussie
              this.fetchPostesVacants();
            },
            (error) => {
              console.error('Une erreur s\'est produite lors de la suppression du poste de travail :', error);
            }
          )
      },
      () => {

      })



  }

  // pagination 
  pageSize = 5;

  currentPage = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }


}
