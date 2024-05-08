import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionCandidature } from 'src/app/models/candidature/sessionCandidature';
import { sessionCandidatureService } from 'src/app/services/candidature/sessionCandidature.service';

@Component({
  selector: 'app-session-candidature-fiche',
  templateUrl: './session-candidature-fiche.component.html',
  styleUrls: ['./session-candidature-fiche.component.css']
})
export class SessionCandidatureFicheComponent {

  sessionCandidature: SessionCandidature[] = [];

  //get By Id
  sessionSelectionne: SessionCandidature | undefined;


  errorMessage: string = '';


  constructor(
    private sessionCandidatureService: sessionCandidatureService,
    private routeActivated: ActivatedRoute
  ) {


  }

  ngOnInit(): void {

    // Extraire l'ID de l'URL
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getSessionById(Number(id)); // Appel de getSessionById avec l'ID
    } else {
      console.error('ID est undefined');
    }

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
}
