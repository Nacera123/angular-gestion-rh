import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidature } from 'src/app/models/candidature/candidature';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { EtatCandidature } from 'src/app/models/candidature/etatCandidature';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';
import { DocumentCandidatureService } from 'src/app/services/candidature/documentCandidature.service';
import { EtatCandidatureService } from 'src/app/services/candidature/etat-candidature.service';

@Component({
  selector: 'app-status-candidat',
  templateUrl: './status-candidat.component.html',
  styleUrls: ['./status-candidat.component.css']
})
export class StatusCandidatComponent {

  documentCandidature: DocumentCandidature[] = [];
  doc: DocumentCandidature = new DocumentCandidature();
  posteSelectionne: Candidature | undefined;
  uniqueCandidatureIds: Set<Number> = new Set();
  candidature: Candidature[] = [];
  toto: Number[] = [];

  etatcandidature: String[] = [];

  etatSelectionne: String | undefined;


  constructor(
    private router: Router,
    private candidatureService: CandidatureService,
    private routeActivated: ActivatedRoute,
    private documentCandidatureService: DocumentCandidatureService,
    private etatCandidatureService: EtatCandidatureService
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

    if (this.posteSelectionne?.etatCandidature) {
      this.etatSelectionne = this.posteSelectionne.etatCandidature.etat;
    }
    //2-etat candidature
    this.etatCandidatureService.getAll().subscribe(
      (nom) => {
        this.etatcandidature = nom
          .filter(nom => nom.etat !== undefined)
          .map(nom => nom.etat!);
      },
      (error) => {
        console.error('Erreur lors de la récupération poste de travail:', error);
      }
    );
  }

  // Méthode pour récupérer la candidature
  getcandidatureById(id?: number) {
    if (id !== undefined) {
      this.uniqueCandidatureIds.add(id);
      this.candidatureService.getById(id).subscribe(data => {
        console.log('nouveau id candidature', data);
      });
    } else {
      console.error('ID est undefined');
    }
  }

  // Méthode pour récupérer le poste par ID
  getPosteById(id?: Number) {
    if (id !== undefined) {
      this.candidatureService.getById(id).subscribe(
        (response: Candidature) => {
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

  // Méthode pour mettre à jour l'état de candidature
  updateEtatCandidature(newEtat: String) {
    if (this.posteSelectionne && this.posteSelectionne.etatCandidature) {
      // Mettez à jour l'état localement
      this.posteSelectionne.etatCandidature.etat = newEtat;

      // Préparez l'objet à envoyer à l'API
      const etatToUpdate = {
        id: this.posteSelectionne.etatCandidature.id, // Assurez-vous d'avoir l'ID
        etat: newEtat
      };

      // Appel au service pour mettre à jour l'état de la candidature
      this.etatCandidatureService.update(etatToUpdate).subscribe(
        (response: any) => {
          console.log('État de candidature mis à jour avec succès:', response);
          this.router.navigate(['admin/candidatures']);
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour de l\'état de candidature:', error);
        }
      );
    } else {
      console.error('Aucune candidature sélectionnée pour la mise à jour.');
    }
  }





  // Récupération des documents associés à une candidature
  getByIdDoc(id: number): void {
    this.documentCandidatureService.getByIdCandidature(id).subscribe(
      (data: DocumentCandidature[]) => {
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

  // Exemple de téléchargement de fichier
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
      console.error('Erreur lors du téléchargement du fichier : ', error);
    });
  }
}







