import { Component, OnInit } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';
import { NomDocument } from 'src/app/models/candidature/nomDocument';
import { NomDocumentService } from 'src/app/services/candidature/nomDocument.service';

@Component({
  selector: 'app-nom-document',
  templateUrl: './nom-document.component.html',
  styleUrls: ['./nom-document.component.css']
})
export class NomDocumentComponent implements OnInit {

  nomDocument: NomDocument[] = [];

  nomDocumentSelectionne: NomDocument | undefined;
  errorMessage: string = '';


  constructor(
    private nomDocumentService: NomDocumentService,
    private confirmService: NgConfirmService

  ) { }


  ngOnInit(): void {
    this.getAllNomDocuments();

  }

  // recuperer tout les noms des documents
  getAllNomDocuments() {
    this.nomDocumentService.getAll()
      .subscribe(
        (response: NomDocument[]) => {
          console.log(response);
          this.nomDocument = response

        },
        (error) => {
          console.error(error);
          this.errorMessage = error;

        }
      )
  }

  // pagination 
  pageSize = 10;

  currentPage = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }

  //suprimer
  deleteSession(id?: Number): void {


    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {

        this.nomDocumentService.delete(id)
          .subscribe(

            () => {
              alert('toto')
              console.log('La session a été supprimé avec succès.');
              // Mettre à jour les données après la suppression réussie
              this.getAllNomDocuments();
            },
            (error) => {
              console.error('Une erreur s\'est produite lors de la suppression de la session de travail :', error);
            }
          )
      },
      () => {

      })

  }

  getNomDocById(id?: Number) {
    console.log(id);
    if (id !== undefined) {
      this.nomDocumentService.getById(id).subscribe(
        (response: NomDocument) => {
          // this.selected = response;
          this.nomDocumentSelectionne = response;
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }
}
