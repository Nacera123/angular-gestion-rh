import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Candidat } from 'src/app/models/candidature/candidat';
import { Candidature } from 'src/app/models/candidature/candidature';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { NomDocument } from 'src/app/models/candidature/nomDocument';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { TestDto } from 'src/app/models/candidature/testDto';
import { Civilite } from 'src/app/models/civilite';
import { Individu } from 'src/app/models/individu';
import { Pays } from 'src/app/models/pays';
import { DocumentCandidatureService } from 'src/app/services/candidature/documentCandidature.service';
import { NomDocumentService } from 'src/app/services/candidature/nomDocument.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { TestService } from 'src/app/services/candidature/test.service';
import { CiviliteService } from 'src/app/services/individu/civilite.service';
import { PaysService } from 'src/app/services/individu/pays.service';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {

  test: DocumentCandidature = new DocumentCandidature();
  nomDoc: NomDocument = new NomDocument();
  candidature: Candidature = new Candidature();
  individu: Individu = new Individu();
  pays: Pays = new Pays();
  civilite: Civilite = new Civilite();


  tabNomDoc: String[] = [];
  tabPays: String[] = [];
  tabCivilite: String[] = [];



  pdfInfo: DocumentCandidature = new DocumentCandidature();
  pdfInfo1: DocumentCandidature = new DocumentCandidature();
  selectedFile1: File | null = null;
  selectedFile2: File | null = null;

  posteSelectionne: PosteVacant | undefined;


  posteId: Number | undefined;
  posteVacant: PosteVacant = new PosteVacant();

  constructor(

    private testService: TestService,
    private nomDocService: NomDocumentService,
    private paysService: PaysService,
    private civiliteService: CiviliteService,
    private documentCandidatureService: DocumentCandidatureService,



    private route: ActivatedRoute,
    private posteVacantService: PosteVacantService


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
    //this.test.nomPieceJointe?.nom

    this.paysService.getAll().subscribe(
      (abc) => {
        this.tabPays = abc
          .filter(abc => abc.designation !== undefined)
          .map(abc => abc.designation!)
      }
    )

    this.civiliteService.getAll().subscribe(
      data => {
        this.tabCivilite = data
          .filter(data => data.designation !== undefined)
          .map(data => data.designation!)
      }
    )


    this.posteId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.posteId) {
      this.getPosteVacantById(this.posteId);
    }


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPosteVacantById(Number(id));
    } else {
      console.error('ID est undefined');
    }
  }


  onFileSelected1(event: any): void {
    this.selectedFile1 = event.target.files[0];
  }
  onFileSelected2(event: any): void {
    this.selectedFile2 = event.target.files[0];
  }
  getPosteVacantById(id: Number) {


    if (id) {
      this.posteVacantService.getById(id).subscribe(
        (response: PosteVacant) => {
          this.posteSelectionne = response;
        },
        error => {
          console.error('Error retrieving post:', error);
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }


  uploadPdf(): void {
    if (this.posteSelectionne) {
      const postId = this.posteSelectionne.id;
      if (postId) {
        if (this.nomDoc.nom && this.individu
          && this.pays && this.pays.designation
          && this.civilite && this.civilite.designation
        ) {
          this.test.nomPieceJointe = this.nomDoc
          this.test.candidature = this.candidature
          this.candidature.individu = this.individu
          this.candidature.posteVacant = this.posteVacant

          forkJoin([
            this.nomDocService.getByNom(this.nomDoc.nom),
            this.paysService.getByDesignation(this.pays.designation),
            this.civiliteService.getByDesignation(this.civilite.designation),

          ]).subscribe(
            ([ses, pes, civ]) => {
              if (ses && pes && civ) {

                if (this.test.candidature && this.test.candidature.individu
                  && this.test.candidature.posteVacant
                ) {
                  this.test.candidature.individu.pays = pes;
                  this.test.candidature.individu.civilite = civ

                }
                this.test.nomPieceJointe = ses;
                if (this.selectedFile1) {
                  this.documentCandidatureService.uploadPdf(this.selectedFile1, this.nomDoc.nom!, postId).subscribe(
                    (response) => {
                      console.log('Test bien ajouté', response);
                      alert('Test bien ajouté');
                    },
                    (error) => {
                      console.log('Erreur lors de la souscription des clés étrangères:', error);
                      console.error('Erreur lors de la souscription des clés étrangères:', error);
                    }
                  )

                }
                if (this.selectedFile2) {
                  this.documentCandidatureService.uploadPdf(this.selectedFile2, this.nomDoc.nom!, postId).subscribe(
                    (response) => {
                      console.log('Test bien ajouté', response);
                      alert('Test bien ajouté');
                    },
                    (error) => {
                      console.log('Erreur lors de la souscription des clés étrangères:', error);
                      console.error('Erreur lors de la souscription des clés étrangères:', error);
                    }
                  )

                }
              }
            }
          )

        } else {
          console.error('Nom de document non valide ou non sélectionné');
          alert('Nom de document non valide ou non sélectionné');
        }
      }

    }

  }


}




// toto: string = '';
// toto1: string = '';



// onFileSelected(event: any) {
//   this.selectedFile = event.target.files[0];
// }




// this.posteVacantService.getById(id).subscribe(
//   (response: PosteVacant) => {
//     this.posteVacant = response;
//   }
// );


























// if (this.selectedFile && this.posteSelectionne) {
//   const postId = this.posteSelectionne.id;
//   if (postId) {

//     this.docCandidatureService.uploadPdf(this.selectedFile, this.toto, postId).subscribe(
//       (response: DocCandidature) => {
//         console.log('Upload successful', response);
//         this.pdfInfo = response;
//         //alert('Upload successful');
//       },
//       error => {
//         console.error('Upload error', error);
//       }
//     );
//   }
// } else {
//   console.error('No file selected or post not selected');
// }
// if (this.selectedFile1 && this.posteSelectionne) {
//   const postId = this.posteSelectionne.id;
//   if (postId) {

//     this.docCandidatureService.uploadPdf(this.selectedFile1, this.toto1, postId).subscribe(
//       (response: DocCandidature) => {
//         console.log('Upload successful', response);
//         this.pdfInfo1 = response;
//         //alert('Upload successful');
//       },
//       error => {
//         console.error('Upload error', error);
//       }
//     );
//   }
// } else {
//   console.error('No file selected or post not selected');
// }
// }























// ajout() {
//   if (this.nomDoc.nom && this.posteVacant.id && this.individu
//     && this.pays && this.pays.designation
//     && this.civilite && this.civilite.designation
//   ) {
//     this.test.nomPieceJointe = this.nomDoc;
//     this.test.candidature = this.candidature;
//     this.candidature.individu = this.individu;
//     this.candidature.posteVacant = this.posteVacant;

//     forkJoin([
//       this.nomDocService.getByNom(this.nomDoc.nom),
//       this.paysService.getByDesignation(this.pays.designation),
//       this.civiliteService.getByDesignation(this.civilite.designation),
//       this.posteVacantService.getById(this.posteVacant.id)
//     ]).subscribe(
//       ([ses, pes, civ, pov]) => {
//         if (ses && pes && civ && pov) {
//           if (this.test.candidature && this.test.candidature.individu
//             && this.test.candidature.posteVacant
//           ) {
//             this.test.candidature.individu.pays = pes;
//             this.test.candidature.individu.civilite = civ;
//             this.test.candidature.posteVacant = pov;
//           }
//           this.test.nomPieceJointe = ses;

//           if (this.posteVacant.id && this.selectedFile) {
//             //this.selectedFile = this.test.pieceJointe
//             this.testService.add2(this.selectedFile, this.test, this.posteVacant.id).subscribe(
//               (response) => {
//                 console.log('Test bien ajouté', response);
//                 alert('Test bien ajouté');
//               },
//               (error) => {
//                 console.log('Erreur lors de la souscription des clés étrangères:', error);
//                 console.error('Erreur lors de la souscription des clés étrangères:', error);
//               }
//             );
//           } else {
//             console.error('Erreur lors de la récupération des données nécessaires ou fichier non sélectionné');
//             alert('Erreur lors de la récupération des données nécessaires ou fichier non sélectionné');
//           }
//         }
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des clés étrangères', error);
//         alert('Erreur lors de la récupération des clés étrangères');
//       }
//     );

//   } else {
//     console.error('Nom de document non valide ou non sélectionné');
//     alert('Nom de document non valide ou non sélectionné');
//   }
// }










//BONNE VERSION


// ajout() {
//   if (this.nomDoc.nom && this.posteVacant.id && this.individu
//     && this.pays && this.pays.designation
//     && this.civilite && this.civilite.designation
//   ) {
//     this.test.nomPieceJointe = this.nomDoc
//     this.test.candidature = this.candidature
//     this.candidature.individu = this.individu
//     this.candidature.posteVacant = this.posteVacant

//     forkJoin([
//       this.nomDocService.getByNom(this.nomDoc.nom),
//       this.paysService.getByDesignation(this.pays.designation),
//       this.civiliteService.getByDesignation(this.civilite.designation),
//       this.posteVacantService.getById(this.posteVacant.id)
//     ]).subscribe(
//       ([ses, pes, civ, pov]) => {
//         if (ses && pes && civ && pov) {

//           if (this.test.candidature && this.test.candidature.individu
//             && this.test.candidature.posteVacant
//           ) {
//             this.test.candidature.individu.pays = pes;
//             this.test.candidature.individu.civilite = civ
//             this.test.candidature.posteVacant = pov
//           }
//           this.test.nomPieceJointe = ses;
//           if (this.posteVacant.id) {
//             this.testService.add2(this.test, this.posteId!).subscribe(
//               (response) => {
//                 console.log('Test bien ajouté', response);
//                 alert('Test bien ajouté');
//               },
//               (error) => {
//                 console.log('Erreur lors de la souscription des clés étrangères:', error);
//                 console.error('Erreur lors de la souscription des clés étrangères:', error);
//               }
//             )

//           } else {
//             console.error('Erreur lors de la récupération des données nécessaires');
//             alert('Erreur lors de la récupération des données nécessaires');
//           }
//         }
//       }
//     )

//   } else {
//     console.error('Nom de document non valide ou non sélectionné');
//     alert('Nom de document non valide ou non sélectionné');
//   }
// }

























