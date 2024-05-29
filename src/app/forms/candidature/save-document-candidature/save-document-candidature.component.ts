import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Candidature } from 'src/app/models/candidature/candidature';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { EtatCandidature } from 'src/app/models/candidature/etatCandidature';
import { GestionCandidatureDto } from 'src/app/models/candidature/gestionCandidatureDto';
import { NomDocument } from 'src/app/models/candidature/nomDocument';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { Civilite } from 'src/app/models/civilite';
import { EtatCivilEnum } from 'src/app/models/enum/etatCivilEnum';
import { EtatCivilEnums } from 'src/app/models/enum/testtest';
import { Individu } from 'src/app/models/individu';
import { Pays } from 'src/app/models/pays';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';
import { DocumentCandidatureService } from 'src/app/services/candidature/documentCandidature.service';
import { EtatCandidatureService } from 'src/app/services/candidature/etat-candidature.service';
import { NomDocumentService } from 'src/app/services/candidature/nomDocument.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { TestService } from 'src/app/services/candidature/test.service';
import { CiviliteService } from 'src/app/services/individu/civilite.service';
import { IndividuService } from 'src/app/services/individu/individu.service';
import { PaysService } from 'src/app/services/individu/pays.service';

@Component({
  selector: 'app-save-document-candidature',
  templateUrl: './save-document-candidature.component.html',
  styleUrls: ['./save-document-candidature.component.css']
})
export class SaveDocumentCandidatureComponent implements OnInit {
  documentCandidature: DocumentCandidature = new DocumentCandidature();
  nomDoc: NomDocument = new NomDocument();

  tabNomDoc: String[] = [];

  constructor(

    private documentCandidatureService: TestService,
    private nomDocService: NomDocumentService,


  ) { }
  ngOnInit(): void {
    this.nomDocService.getAll().subscribe(
      (sessref) => {
        this.tabNomDoc = sessref
          .filter(sessref => sessref.nom !== undefined) // Filtrer les valeurs 'undefined'
          .map(sessref => sessref.nom!); // Utiliser le '!' pour indiquer que 'ref' ne sera pas 'undefined'

      },
      (error) => {
        console.error('Erreur lors de la récupération des sessions:', error);
      }
    );

  }

  add() {

  }
  ajout() {
    // if (this.nomDoc.nom) {
    //   this.documentCandidature.nomPieceJointe = this.nomDoc;
    //   this.documentCandidature.nomPieceJointe.nom = this.nomDoc.nom;
    //   console.log(this.documentCandidature.nomPieceJointe.nom);

    //   forkJoin([
    //     this.nomDocService.getByNom(this.nomDoc.nom),
    //   ]).subscribe(
    //     ([ses]) => {
    //       this.documentCandidature.nomPieceJointe = ses;
    //       this.documentCandidatureService.add1(this.documentCandidature).subscribe(
    //         (response) => {
    //           console.log('Test bien ajouté', response);
    //           alert('Test bien ajouté');
    //         },
    //         (error) => {
    //           console.log('Erreur lors de la souscription des clés étrangères:', error);
    //           console.error('Erreur lors de la souscription des clés étrangères:', error);
    //         }
    //       );
    //     },
    //     (error) => {
    //       console.error('Erreur lors de la récupération de l\'ID:', error);
    //       console.log('Erreur lors de la récupération de l\'ID:', error);
    //     }
    //   );

    // } else {
    //   console.error('Nom de document non valide ou non sélectionné');
    //   alert('Nom de document non valide ou non sélectionné');
    // }
  }
  ajoutPoste() {
    if (this.nomDoc.nom) {
      this.documentCandidature.nomPieceJointe = this.nomDoc;
      this.documentCandidature.nomPieceJointe.nom = this.nomDoc.nom;
      console.log(this.documentCandidature.nomPieceJointe.nom);

      forkJoin([
        this.nomDocService.getByNom(this.nomDoc.nom),
      ]).subscribe(
        ([ses]) => {
          this.documentCandidature.nomPieceJointe = ses;
          this.documentCandidatureService.add(this.documentCandidature, this.documentCandidature.nomPieceJointe.nom as String).subscribe(
            (response) => {
              console.log('Test bien ajouté', response);
              alert('Test bien ajouté');
            },
            (error) => {
              console.log('Erreur lors de la souscription des clés étrangères:', error);
              console.error('Erreur lors de la souscription des clés étrangères:', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'ID:', error);
          console.log('Erreur lors de la récupération de l\'ID:', error);
        }
      );

    } else {
      console.error('Nom de document non valide ou non sélectionné');
      alert('Nom de document non valide ou non sélectionné');
    }
  }



}




































// save() {


//   this.gestionCandidature.pieceJointe = this.formGroup.get('pieceJointe')?.value

//   this.gestionCandidature.typePieceJointe = this.formGroup.get('typePieceJointe')?.value
//   this.gestionCandidature.typePieceJointe = this.nomDocument

//   //this.gestionCandidature.paysIndividu = this.individu.pays
//   this.gestionCandidature.paysIndividu = this.formGroup.get('paysIndividu')?.value




//   //this.gestionCandidature.civilite = this.individu.etatCivilEnum
//   this.gestionCandidature.civilite = this.formGroup.get('pieceJointe')?.value

//   this.gestionCandidature.nomIndividu = this.individu.nom
//   this.gestionCandidature.nomIndividu = this.formGroup.get('nomIndividu')?.value

//   this.gestionCandidature.prenomIndividu = this.individu.prenom
//   this.gestionCandidature.prenomIndividu = this.formGroup.get('prenomIndividu')?.value

//   this.gestionCandidature.telephoneIndividu = this.individu.telephone
//   this.gestionCandidature.telephoneIndividu = this.formGroup.get('telephoneIndividu')?.value

//   this.gestionCandidature.emailIndividu = this.individu.email
//   this.gestionCandidature.emailIndividu = this.formGroup.get('emailIndividu')?.value



//   this.gestionCandidature.nomPoste = this.posteVacant.poste?.nom
//   this.gestionCandidature.nomPoste = this.formGroup.get('nomPoste')?.value


//   if (this.etatCivilEnum && this.pays.designation && this.nomDocument.nom) {
//     forkJoin([
//       this.paysService.getByDesignation(this.pays.designation),
//       this.civilite = Object.values(EtatCivilEnum).filter(value => typeof value === 'string'),
//       this.nomDocService.getByNom(this.nomDocument.nom)
//     ]).subscribe(
//       ([pays, nomDocument]) => {

//         // this.gestionCandidature.typePieceJointe =nomDocument

//         // this.gestionCandidature.paysIndividu = pays
//         // this.gestionCandidature.civilite = etatCivilEnum



//         this.documentService.add(this.gestionCandidature).subscribe(
//           data => {
//             console.log(data);
//             alert("Vous êtes bien enregistré");
//           }
//         )
//       }
//     )
//   }






// }



// save() {
//   // Assurez-vous que toutes les données nécessaires sont disponibles
//   if (!this.civilite || !this.pays || !this.nomDocument || !this.candidature) {
//     console.error("Veuillez remplir tous les champs nécessaires.");
//     return;
//   }

//   // Remplissez les détails de l'individu
//   this.individu.etatCivilEnum = this.etatCivilEnum;
//   this.individu.pays = this.pays;
//   this.individu.nom = this.nomIndividu;
//   this.individu.prenom = this.prenomIndividu;
//   this.individu.telephone = this.telephoneIndividu;
//   this.individu.email = this.emailIndividu;

//   // Remplissez les détails de la candidature
//   this.candidature.nomPoste = this.nomPoste;

//   // Assurez-vous que l'état de la candidature est correctement défini
//   this.etatCandidatureService.getByEtat("Candidature consultée par le recruteur").subscribe(
//     (etatCandidature) => {
//       // Assurez-vous que l'état de la candidature est correctement défini
//       this.candidature.etatCandidature = etatCandidature;

//       // Assignez la candidature au document de candidature
//       this.gestionCandidature.civilite = this.civilite;
//       this.gestionCandidature.nomIndividu = this.nomIndividu;
//       this.gestionCandidature.prenomIndividu = this.prenomIndividu;
//       this.gestionCandidature.telephoneIndividu = this.telephoneIndividu;
//       this.gestionCandidature.emailIndividu = this.emailIndividu;
//       this.gestionCandidature.paysIndividu = this.pays.designation; // Ou ce qui est approprié pour votre modèle
//       this.gestionCandidature.civilite = this.civilite;
//       this.gestionCandidature.nomPoste = this.nomPoste;

//       // Appelez le service pour enregistrer le document de candidature
//       this.documentService.save(this.gestionCandidature).subscribe(
//         (result) => {
//           console.log("Document de candidature enregistré avec succès:", result);
//           // Réinitialiser les valeurs après l'enregistrement réussi si nécessaire
//           // this.gestionCandidature = new GestionCandidatureDto();
//           // Réinitialiser d'autres valeurs si nécessaire
//         },
//         (error) => {
//           console.error("Erreur lors de l'enregistrement du document de candidature:", error);
//         }
//       );
//     },
//     (error) => {
//       console.error("Erreur lors de la récupération de l'état de la candidature:", error);
//     }
//   );
// }



