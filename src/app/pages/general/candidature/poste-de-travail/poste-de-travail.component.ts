import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PosteDeTravail } from 'src/app/models/candidature/posteDeTravail';
import { PosteDeTravailService } from 'src/app/services/candidature/poste-de-travail.service';
import { NgConfirmService } from 'ng-confirm-box';


@Component({
  selector: 'app-poste-de-travail',
  templateUrl: './poste-de-travail.component.html',
  styleUrls: ['./poste-de-travail.component.css']
})
export class PosteDeTravailComponent implements OnInit {


  posteDeTravail: PosteDeTravail[] = [];

  selected: PosteDeTravail = new PosteDeTravail();

  posteSelectionne: PosteDeTravail | undefined;

  constructor(
    private posteDeTravailService: PosteDeTravailService,
    private routeActivated: ActivatedRoute,
    private confirmService: NgConfirmService
  ) {


  }

  ngOnInit(): void {
    this.getAllPostesDeTravail();
  }

  getAllPostesDeTravail(): void {
    this.posteDeTravailService.getAll().subscribe(
      (response: PosteDeTravail[]) => {
        console.log(response);
        this.posteDeTravail = response;
      },
      (error) => {
        console.error(error);
      }
    );
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

  // DELETE
  deletePoste(id?: Number): void {

    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {

        this.posteDeTravailService.delete(id)
          .subscribe(

            () => {
              console.log('Le poste de travail a été supprimé avec succès.');
              // Mettre à jour les données après la suppression réussie
              this.getAllPostesDeTravail();
            },
            (error) => {
              console.error('Une erreur s\'est produite lors de la suppression du poste de travail :', error);
            }
          )
      },
      () => {

      })







  }





  pageSize = 10;

  currentPage = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }


}








