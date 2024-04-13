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


  constructor(
    private documentCandidatureService: DocumentCandidatureService,
  ) { }

  ngOnInit(): void {

    this.documentCandidatureService.getAll()
      .subscribe(
        (response: DocumentCandidature[]) => {
          console.log(response);
          this.documentCandidature = response

        },
        (error) => {
          console.error(error);

        }
      )

  }






}
