import { Component, OnInit } from '@angular/core';
import { PosteDeTravail } from 'src/app/models/candidature/posteDeTravail';
import { PosteDeTravailService } from 'src/app/services/candidature/poste-de-travail.service';

@Component({
  selector: 'app-poste-de-travail',
  templateUrl: './poste-de-travail.component.html',
  styleUrls: ['./poste-de-travail.component.css']
})
export class PosteDeTravailComponent implements OnInit {


  posteDeTravail: PosteDeTravail[] = [];


  constructor(
    private posteDeTravailService: PosteDeTravailService
  ) { }

  ngOnInit(): void {

    this.posteDeTravailService.getAll()
      .subscribe(
        (response: PosteDeTravail[]) => {
          console.log(response);
          this.posteDeTravail = response

        },
        (error) => {
          console.error(error);

        }
      )
  }

}
