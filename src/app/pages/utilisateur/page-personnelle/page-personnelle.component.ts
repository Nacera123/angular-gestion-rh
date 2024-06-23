import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/models/candidature/candidature';
import { EtatCandidature } from 'src/app/models/candidature/etatCandidature';
import { Individu } from 'src/app/models/individu';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';
import { EtatCandidatureService } from 'src/app/services/candidature/etat-candidature.service';
import { IndividuService } from 'src/app/services/individu/individu.service';

@Component({
  selector: 'app-page-personnelle',
  templateUrl: './page-personnelle.component.html',
  styleUrls: ['./page-personnelle.component.css', './bootstrap.min.css']
})
export class PagePersonnelleComponent implements OnInit {


  etatCandidature: EtatCandidature = new EtatCandidature();
  tabEtatCandidature: String[] = [];

  currentUserEmail: string | null = null;
  tabCandidatures: Number[] = [];
  // tabCandidatures: Candidature[] = [];

  candidature: Candidature = new Candidature();


  constructor(
    private etatCandidatureService: EtatCandidatureService,
    private candidatureService: CandidatureService,
    private individuService: IndividuService,
    private authService: AuthenticationService,

  ) { }

  ngOnInit(): void {
    this.etatCandidatureService.getAll().subscribe(
      data => {
        this.tabEtatCandidature = data
          .filter(data => data.etat !== undefined)
          .map(data => data.etat!)
      }
    );

    const individuId = localStorage.getItem('id_individu');
    if (individuId !== null) {
      console.log('id en string', individuId);
      const id = parseInt(individuId, 10);
      console.log('id en number', id);
      this.candidatureService.getByIndividu(id).subscribe(
        data => {
          this.tabCandidatures = data
            .filter(data => data.id !== undefined)
            .map(data => data.id!)
          console.log(data);


        }
      )

    } else {
      console.error('ID de l\'individu non trouvé.');
    }

    // if (individuId !== null) {
    //   const id = parseInt(individuId, 10);
    //   this.candidatureService.getByIndividu(id).subscribe(
    //     candidatures => {
    //       this.tabCandidatures = candidatures;
    //       console.log('Candidatures par id_individu:', this.tabCandidatures);
    //     },
    //     error => {
    //       console.error('Erreur lors de la récupération des candidatures:', error);
    //     }
    //   );
    // } else {
    //   console.error('ID de l\'individu non trouvé.');
    // }

  }






  // const userId = this.authService.getCurrentUserId();

  // if (userId !== null) {

  //   this.candidatureService.getByIndividu(userId).subscribe(
  //     candidatures => {
  //       this.tabCandidatures = candidatures

  //       console.log('Candidatures par id_individu:', this.tabCandidatures);
  //     },
  //     error => {
  //       console.error('Erreur lors de la récupération des candidatures:', error);
  //     }
  //   );
  // } else {
  //   console.error('ID de l\'utilisateur non trouvé.');
  // }


}




