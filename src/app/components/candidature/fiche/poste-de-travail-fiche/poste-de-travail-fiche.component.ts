import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PosteDeTravail } from 'src/app/models/candidature/posteDeTravail';
import { PosteDeTravailService } from 'src/app/services/candidature/poste-de-travail.service';

@Component({
  selector: 'app-poste-de-travail-fiche',
  templateUrl: './poste-de-travail-fiche.component.html',
  styleUrls: ['./poste-de-travail-fiche.component.css']
})
export class PosteDeTravailFicheComponent implements OnInit {


  posteDeTravail: PosteDeTravail[] = [];

  selected: PosteDeTravail = new PosteDeTravail();

  posteSelectionne: PosteDeTravail | undefined;

  constructor(
    private posteDeTravailService: PosteDeTravailService,
    private routeActivated: ActivatedRoute
  ) {


  }

  ngOnInit(): void {



  }

  toto(id?: Number) {


    console.log(id);
    if (id !== undefined) {
      this.posteDeTravailService.getById(id).subscribe(
        (response: PosteDeTravail) => {
          // this.selected = response;
          this.posteSelectionne = response;
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }


}
