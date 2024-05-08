import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';

@Component({
  selector: 'app-fiche-poste-vacant',
  templateUrl: './fiche-poste-vacant.component.html',
  styleUrls: ['./fiche-poste-vacant.component.css']
})
export class FichePosteVacantComponent implements OnInit {

  posteVacant: PosteVacant[] = [];

  posteSelectionne: PosteVacant | undefined;

  contenuHtml: SafeHtml = '';


  constructor(
    private posteVacantService: PosteVacantService,
    private routeActivated: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    const id = this.routeActivated.snapshot.paramMap.get('id');

    if (id) {
      this.getPosteVacantById(Number(id));
    } else {
      console.log('id undefined');

    }
  }
  ngOnInit(): void {
    this.getPosteVacantById();
  }

  getPosteVacantById(id?: Number) {
    console.log(id);
    if (id !== undefined) {

      this.posteVacantService.getById(id).subscribe(
        (response: PosteVacant) => {
          this.posteSelectionne = response
          if (this.posteSelectionne.descriptif !== undefined && typeof this.posteSelectionne.descriptif === 'string') {

            this.contenuHtml = this.sanitizer.bypassSecurityTrustHtml(this.posteSelectionne.descriptif)
          } else {
            this.contenuHtml = '';
          }
        }
      )
    } else {
      console.log('Id undefined');

    }


  }

}
