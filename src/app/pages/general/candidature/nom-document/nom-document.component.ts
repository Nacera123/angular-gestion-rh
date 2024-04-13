import { Component, OnInit } from '@angular/core';
import { NomDocument } from 'src/app/models/candidature/nomDocument';
import { NomDocumentService } from 'src/app/services/candidature/nomDocument.service';

@Component({
  selector: 'app-nom-document',
  templateUrl: './nom-document.component.html',
  styleUrls: ['./nom-document.component.css']
})
export class NomDocumentComponent implements OnInit {

  nomDocument: NomDocument[] = [];

  constructor(
    private nomDocumentService: NomDocumentService
  ) { }


  ngOnInit(): void {

    this.nomDocumentService.getAll()
      .subscribe(
        (response: NomDocument[]) => {
          console.log(response);
          this.nomDocument = response

        },
        (error) => {
          console.error(error);

        }
      )
  }



}
