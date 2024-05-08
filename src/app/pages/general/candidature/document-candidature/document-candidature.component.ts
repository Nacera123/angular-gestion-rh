import { Component, OnInit } from '@angular/core';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { DocumentCandidatureService } from 'src/app/services/candidature/documentCandidature.service';

@Component({
  selector: 'app-document-candidature',
  templateUrl: './document-candidature.component.html',
  styleUrls: ['./document-candidature.component.css']
})
export class DocumentCandidatureComponent implements OnInit {


  documentCandidature: DocumentCandidature[] = [];

  errorMessage: string = '';



  //gestion pagination
  pageSize = 10;

  currentPage = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }


  constructor(
    private documentCandidatureService: DocumentCandidatureService,
  ) { }

  ngOnInit(): void {
    this.getAllDocument();

  }

  // recuperer la liste des document de candidature
  getAllDocument() {


    this.documentCandidatureService.getAll()
      .subscribe(
        (response: DocumentCandidature[]) => {
          console.log(response);
          this.documentCandidature = response

        },
        (error) => {
          console.error(error);
          this.errorMessage = error

        }
      )
  }






}
