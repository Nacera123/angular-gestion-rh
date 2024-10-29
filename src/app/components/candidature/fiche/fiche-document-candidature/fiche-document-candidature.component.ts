import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { DocumentCandidatureService } from 'src/app/services/candidature/documentCandidature.service';

@Component({
  selector: 'app-fiche-document-candidature',
  templateUrl: './fiche-document-candidature.component.html',
  styleUrls: ['./fiche-document-candidature.component.css']
})
export class FicheDocumentCandidatureComponent implements OnInit {

  documentCandidature: DocumentCandidature[] = [];

  selectedDocument: DocumentCandidature = new DocumentCandidature();


  constructor(
    private documentCandidatureService: DocumentCandidatureService,
    private routeActivated: ActivatedRoute
  ) {
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getDocById(Number(id));
    } else {
      console.error('ID est undefined');
    }
  }

  ngOnInit(): void {
  }

  getDocById(id?: Number) {


    console.log(id);
    if (id !== undefined) {
      this.documentCandidatureService.getById(id).subscribe(
        (response: DocumentCandidature) => {
          // this.selected = response;
          this.selectedDocument = response;
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }
}
