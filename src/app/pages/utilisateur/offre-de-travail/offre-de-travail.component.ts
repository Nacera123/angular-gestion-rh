import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';

@Component({
  selector: 'app-offre-de-travail',
  templateUrl: './offre-de-travail.component.html',
  styleUrls: ['./offre-de-travail.component.css']
})
export class OffreDeTravailComponent {

  posteVaccant: PosteVacant[] = [];


  errorMessage: string = '';
  posteSelectionne: PosteVacant | undefined;
  safeHtml: SafeHtml = '';


  // pagination 
  pageSize = 10;

  currentPage = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }


  postesVacants: PosteVacant[] = [];

  constructor(
    private posteVacantService: PosteVacantService,
    private routeActivated: ActivatedRoute,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.fetchPostesVacants();
    // this.getPosteVacantById;

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


  // getPosteVacantById(id?: Number) {

  //   console.log(id);

  //   if (id !== undefined) {
  //     this.posteVacantService.getById(id).subscribe(
  //       (response: PosteVacant) => {
  //         this.posteSelectionne = response

  //         if (this.posteSelectionne.descriptif !== undefined && typeof this.posteSelectionne.descriptif === 'string') {

  //           this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.posteSelectionne.descriptif);
  //         } else {
  //           this.safeHtml;
  //         }
  //       }
  //     )
  //   } else {
  //     console.log("ID undfined");
  //     alert("ID undfined");

  //   }


  // }

}


