import { Component, OnInit } from '@angular/core';
import { EtatCandidature } from 'src/app/models/candidature/etatCandidature';
import { EtatCandidatureService } from 'src/app/services/candidature/etat-candidature.service';

@Component({
  selector: 'app-etat-candidature',
  templateUrl: './etat-candidature.component.html',
  styleUrls: ['./etat-candidature.component.css']
})
export class EtatCandidatureComponent implements OnInit {

  etatCandidature: EtatCandidature[] = [];

  constructor(
    private etatCandidatureService: EtatCandidatureService
  ) { }


  ngOnInit(): void {

    this.etatCandidatureService.getAll()
      .subscribe(
        (response: EtatCandidature[]) => {

          console.log('toto');

          console.log(response);
          this.etatCandidature = response

        },

        (error) => {
          console.error(error);

        }
      )
  }

}
