import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Candidature } from 'src/app/models/candidature/candidature';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { GestionCandidatureDto } from 'src/app/models/candidature/gestionCandidatureDto';
import { NomDocument } from 'src/app/models/candidature/nomDocument';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { Civilite } from 'src/app/models/civilite';
import { Individu } from 'src/app/models/individu';
import { Pays } from 'src/app/models/pays';
import { DocCandidatureService } from 'src/app/services/candidature/docCandidature.service';
import { NomDocumentService } from 'src/app/services/candidature/nomDocument.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { CiviliteService } from 'src/app/services/individu/civilite.service';
import { PaysService } from 'src/app/services/individu/pays.service';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent {
  //pdf
  // pdfInfo: GestionCandidatureDto = new GestionCandidatureDto();
  // pdfInfo1: GestionCandidatureDto = new GestionCandidatureDto();

  ///selection de file
  selectedFile: File | null = null;//
  selectedFile1: File | null = null;//

  //poste vacant
  posteSelectionne: PosteVacant | undefined;//
/********************* */
  //pays
  pays: Pays = new Pays();//
  tabPays: String[] = [];//

  //civilite
  civilite: Civilite = new Civilite();//
  tabCivilite: String[] = [];//

  candidature: Candidature = new Candidature();//
  individu: Individu = new Individu();//
  test: DocumentCandidature = new DocumentCandidature();//
  /** */

  nomDoc: NomDocument = new NomDocument();//
  nomDoc1: NomDocument = new NomDocument();//
  tabNomDoc: String[] = [];//
  tabNomDoc1: String[] = [];//


  constructor(
    private docCandidatureService: DocCandidatureService,
    private routeActivated: ActivatedRoute,
    private posteService: PosteVacantService,
    private civiliteService: CiviliteService,
    private nomDocService: NomDocumentService,
    private paysService: PaysService,
    public router: Router,

  ) { }

  ngOnInit(): void {
    //recuperer l'id du poste vacant
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getPosteById(Number(id));
    } else {
      console.error('ID est undefined');
    }

    // nom de document
    this.nomDocService.getAll().subscribe(
      (sessref) => {
        this.tabNomDoc = sessref
          .filter(sessref => sessref.nom !== undefined) 
          .map(sessref => sessref.nom!); 

          this.tabNomDoc1 = sessref
          .filter(sessref => sessref.nom !== undefined) 
          .map(sessref => sessref.nom!); 

      },
      (error) => {
        console.error('Erreur lors de la récupération des sessions:', error);
      }
    );

    //le pays
    this.paysService.getAll().subscribe(
      (abc) => {
        this.tabPays = abc
          .filter(abc => abc.designation !== undefined)
          .map(abc => abc.designation!)
      }
    )

    //civilite
    this.civiliteService.getAll().subscribe(
      data => {
        this.tabCivilite = data
          .filter(data => data.designation !== undefined)
          .map(data => data.designation!)
      }
    )
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onFileSelected1(event: any): void {
    this.selectedFile1 = event.target.files[0];
  }



  uploadPdf(): void {
    /*
    // Télécharger le premier fichier PDF
    if (this.selectedFile && this.posteSelectionne && this.selectedFile1) {
      const postId = this.posteSelectionne.id;
      if (postId) {

        if (this.nomDoc && this.nomDoc.nom && this.nomDoc1.nom) {
          
          this.docCandidatureService.uploadCvLm(this.selectedFile,this.selectedFile1,  this.nomDoc.nom, this.nomDoc1.nom, postId).subscribe(
           {
              next(response: DocumentCandidature) {
                console.log('Upload successful', response);

              },
              error(err) {
                console.error('Upload error', err);
              },
           } 
          );
        }
      }
    } else {
      console.error('No file selected or post not selected');
    }*/

  }
  uploadPdf1(): void {
    let route = this.router;
    
    // Télécharger le premier fichier PDF
    if (this.selectedFile && this.posteSelectionne && this.selectedFile1) {
      const postId = this.posteSelectionne.id;
      if (postId) {

        if (this.nomDoc && this.nomDoc.nom && this.nomDoc1.nom) {
          if ( this.individu
            && this.pays && this.pays.designation
            && this.civilite && this.civilite.designation
          ){
            this.test.candidature = this.candidature
            this.candidature.individu = this.individu
            alert("m1");
            forkJoin([
              this.paysService.getByDesignation(this.pays.designation),
              this.civiliteService.getByDesignation(this.civilite.designation),
 
  
            ]).subscribe(
              ([pes, civ]) => {
                if (pes && civ) {
                  alert("m2");
                  console.log(this.test);
                  if (this.test.candidature && this.test.candidature.individu
                  ) {
                    this.test.candidature.individu.pays = pes;
                    this.test.candidature.individu.civilite = civ
                    this.test.candidature.individu.nom = this.candidature.individu?.nom
                    //this.test.candidature = this.candidature
                    this.candidature.individu = this.individu
                    alert("m3");

                    if(this.selectedFile && this.posteSelectionne && this.selectedFile1 && this.nomDoc.nom && this.nomDoc1.nom){

                      console.log(this.test.candidature.individu)
                      // objet qui content toute les infos à part les fichiers
                      this.docCandidatureService.uploadCvLm(this.selectedFile,this.selectedFile1,  this.nomDoc.nom, this.nomDoc1.nom, JSON.stringify(this.test.candidature.individu), postId).subscribe(
                        {
                           next(response: any) {
                             console.log('Upload successful', response);

                              // Affiche la boîte de dialogue de confirmation
                              var userConfirmed = confirm("Voulez-vous vraiment continuer ?");
                              
                              // Vérifie la réponse de l'utilisateur
                              if (userConfirmed) {
                                  alert("Vous avez cliqué sur OK");
                                  route.navigate(['/individu/register', response.idIndividu]);

                              } else {
                                  // alert("Vous avez cliqué sur Annuler");
                                  // redi vers la page des offres
                                  route.navigate(['/'])
                                  console.log('bien enregistré');
  
                              }
                           },
                           error(err) {
                             console.error('Upload error', err);
                           },
                        } 
                       );
                    }
  
                  }
                }
              }
              
            )
          }

        }
      }
    } else {
      console.error('No file selected or post not selected');
    }

  }

  getPosteById(id: Number): void {
    if (id) {
      this.posteService.getById(id).subscribe(
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
}

// uploadPdf(): void {
    
//   // Télécharger le premier fichier PDF
//   if (this.selectedFile && this.posteSelectionne) {
//     const postId = this.posteSelectionne.id;
//     if (postId) {
//       this.docCandidatureService.uploadPdf(this.selectedFile,this.selectedFile1,  this.toto, postId).subscribe(
//         (response: DocumentCandidature) => {
//           console.log('Upload successful', response);
//           this.pdfInfo = response;
//         },
//         error => {
//           console.error('Upload error', error);
//         }
//       );
//     }
//   } else {
//     console.error('No file selected or post not selected');
//   }

//   // Télécharger le deuxième fichier PDF
//   if (this.selectedFile1 && this.posteSelectionne) {
//     const postId = this.posteSelectionne.id;
//     if (postId) {
//       this.docCandidatureService.uploadPdf(this.selectedFile1, this.toto1, postId).subscribe(
//         (response: DocumentCandidature) => {
//           console.log('Upload successful', response);
//           this.pdfInfo1 = response;
//         },
//         error => {
//           console.error('Upload error', error);
//         }
//       );
//     }
//   } else {
//     console.error('No file selected or post not selected');
//   }
// }
