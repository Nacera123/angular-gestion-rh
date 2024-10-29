import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidature } from 'src/app/models/candidature/candidature';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { EtatCandidature } from 'src/app/models/candidature/etatCandidature';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';
import { DocumentCandidatureService } from 'src/app/services/candidature/documentCandidature.service';

@Component({
  selector: 'app-fiche-candidature',
  templateUrl: './fiche-candidature.component.html',
  styleUrls: ['./fiche-candidature.component.css']
})
export class FicheCandidatureComponent implements OnInit {
  documentCandidature: DocumentCandidature[] = [];
  doc: DocumentCandidature = new DocumentCandidature();
  posteSelectionne: Candidature | undefined;
  uniqueCandidatureIds: Set<Number> = new Set();

  a: Set<Number> = new Set();

  candidature: Candidature[] = [];

  toto: Number[] = [];
  // uniqueCandidatureIds: Map<Number, number> = new Map(); // Utilisation d'un Map pour le débogage

  constructor(
    private candidatureService: CandidatureService,
    private routeActivated: ActivatedRoute,
    private documentCandidatureService: DocumentCandidatureService,

  ) {
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getcandidatureById(Number(id));
      this.getByIdDoc(Number(id));
    } else {
      console.error('ID est undefined');
    }

  }

  ngOnInit(): void {
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getcandidatureById(Number(id));
      this.getByIdDoc(Number(id));
      this.getPosteById(Number(id));
    } else {
      console.error('ID est undefined');
    }
  }



  getcandidatureById(id?: number) {
    if (id !== undefined) {
      console.log('id candidature', id);
      this.uniqueCandidatureIds.add(id);
      console.log('uniqueCandidatureIds', this.uniqueCandidatureIds);

      this.candidatureService.getById(id).subscribe(
        data => {
          console.log('nouveau id candidature', data);
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }


  getPosteById(id?: Number) {
    console.log('ID reçu:', id);
    if (id !== undefined) {
      this.candidatureService.getById(id).subscribe(
        (response: Candidature) => {
          console.log('Réponse du service:', response);
          this.posteSelectionne = response;
        },
        error => {
          console.error('Erreur lors de la récupération de la candidature:', error);
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }


  getByIdDoc(id: number): void {
    this.documentCandidatureService.getByIdCandidature(id).subscribe(
      (data: DocumentCandidature[]) => {
        console.log('Documents récupérés:', data);
        // Ajouter chaque document à la liste, en vérifiant l'unicité si nécessaire
        data.forEach(doc => {
          if (!this.documentCandidature.some(d => d.id === doc.id)) {
            this.documentCandidature.push(doc);
          }
        });
      },
      error => {
        console.error('Erreur lors de la récupération des documents:', error);
      }
    );
  }


  test1(filePath: string) {
    this.documentCandidatureService.test(filePath).subscribe(blob => {
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = filePath.substr(filePath.lastIndexOf('/') + 1);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading file: ', error);
      // Handle error as needed
    });
  }
}
