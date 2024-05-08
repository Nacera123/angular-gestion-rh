import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionCandidature } from 'src/app/models/candidature/sessionCandidature';
import { sessionCandidatureService } from 'src/app/services/candidature/sessionCandidature.service';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-session-candidature',
  templateUrl: './session-candidature.component.html',
  styleUrls: ['./session-candidature.component.css']
})
export class SessionCandidatureComponent implements OnInit {

  sessionCandidature: SessionCandidature[] = [];

  //get By Id
  sessionSelectionne: SessionCandidature | undefined;
  //erreur
  errorMessage: string = '';


  constructor(
    private sessionCandidatureService: sessionCandidatureService,
    private routeActivated: ActivatedRoute,
    private confirmService: NgConfirmService
  ) { }

  //pagination
  pageSize = 10;
  currentPage = 1;

  pageChanged(event: any): void {
    this.currentPage = event;
  }

  ngOnInit(): void {
    this.getAllSessionCandidature();
    // this.loadSessionFromRoute();

  }

  // private loadSessionFromRoute(): void {
  //   const id = this.routeActivated.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.getSessionById(Number(id)); // Appel de getSessionById avec l'ID
  //   } else {
  //     console.error('ID est undefined');
  //   }
  // }

  //1- get all session
  getAllSessionCandidature() {
    this.sessionCandidatureService.getAll()
      .subscribe(
        (response: SessionCandidature[]) => {
          console.log(response);
          this.sessionCandidature = response
        },
        (error) => {
          console.error(error);
          this.errorMessage = error;


        }
      )


  }

  //2- get session by Id
  getSessionById(id?: Number) {


    console.log(id);
    if (id !== undefined) {
      this.sessionCandidatureService.getById(id).subscribe(
        (response: SessionCandidature) => {
          // this.selected = response;
          this.sessionSelectionne = response;
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }

  //3-  DELETE
  deleteSession(id?: Number): void {

    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {

        this.sessionCandidatureService.delete(id)
          .subscribe(

            () => {
              console.log('La session a été supprimé avec succès.');
              // Mettre à jour les données après la suppression réussie
              this.getAllSessionCandidature();
            },
            (error) => {
              console.error('Une erreur s\'est produite lors de la suppression de la session de travail :', error);
            }
          )
      },
      () => {

      })

  }


}
