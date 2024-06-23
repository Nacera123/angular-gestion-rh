import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgConfirmComponent, NgConfirmService } from 'ng-confirm-box';
import { forkJoin } from 'rxjs';
import { Candidats } from 'src/app/models/candidature/candidats';
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
import { DocCandidatureService } from 'src/app/services/candidature/docCandidature.service';
import { DocumentCandidatureService } from 'src/app/services/candidature/documentCandidature.service';
import { EtatCandidatureService } from 'src/app/services/candidature/etat-candidature.service';
import { NomDocumentService } from 'src/app/services/candidature/nomDocument.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { TestService } from 'src/app/services/candidature/test.service';
import { CiviliteService } from 'src/app/services/individu/civilite.service';
import { IndividuService } from 'src/app/services/individu/individu.service';
import { PaysService } from 'src/app/services/individu/pays.service';


declare var bootstrap: any;

@Component({
  selector: 'app-save-document-candidature',
  templateUrl: './save-document-candidature.component.html',
  styleUrls: ['./save-document-candidature.component.css']
})
export class SaveDocumentCandidatureComponent implements OnInit {

  //poste vacant
  posteSelectionne: PosteVacant | undefined;

  //liste deroulante des nom de document
  tabNomDoc: String[] = [];
  tabNomDoc1: String[] = [];

  //liste deroulante des pays
  tabPays: String[] = [];

  //liste deroulante des pays
  tabCivilite: String[] = [];

  ///selection de file
  selectedFile: File | null = null;
  selectedFile1: File | null = null;

  //class
  nomDoc: NomDocument = new NomDocument();
  nomDoc1: NomDocument = new NomDocument();
  civilite: Civilite = new Civilite();
  pays: Pays = new Pays();
  individu: Individu = new Individu();
  docCandidature: DocumentCandidature = new DocumentCandidature();
  candidature: Candidature = new Candidature();
  candidat: Candidats = new Candidats();



  private modal: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private posteService: PosteVacantService,
    private nomDocService: NomDocumentService,
    private paysService: PaysService,
    private civiliteService: CiviliteService,
    private documentcandidatureService: DocumentCandidatureService,
    public router: Router,
    private confirmService: NgConfirmService,
  ) { }
  ngOnInit(): void {

    //recuperer l'id du poste vacant
    const id = this.activatedRoute.snapshot.paramMap.get('id');
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


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onFileSelected1(event: any): void {
    this.selectedFile1 = event.target.files[0];
  }
  //////////////************************ */


  onCancel() {
    this.modal.hide();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500); // Adjust the timeout as necessary to ensure modal is completely hidden
  }


  // uploadPdf(): void {
  //   console.log('step 1');

  //   if (this.selectedFile && this.posteSelectionne && this.selectedFile1) {
  //     const postId = this.posteSelectionne.id;
  //     if (postId) {
  //       if (this.nomDoc && this.nomDoc.nom && this.nomDoc1.nom) {
  //         if (this.individu
  //           && this.pays && this.pays.designation
  //           && this.civilite && this.civilite.designation
  //         ) {
  //           this.docCandidature.candidature = this.candidature;
  //           this.candidature.individu = this.individu;
  //           this.individu._id = this.candidat.individu?._id;
  //           // alert(this.candidat.individu?._id);

  //           forkJoin([
  //             this.paysService.getByDesignation(this.pays.designation),
  //             this.civiliteService.getByDesignation(this.civilite.designation),
  //           ]).subscribe(
  //             ([pes, civ]) => {
  //               if (pes && civ) {

  //                 console.log(this.docCandidature);

  //                 if (this.docCandidature.candidature && this.docCandidature.candidature.individu) {
  //                   this.docCandidature.candidature.individu.pays = pes;
  //                   this.docCandidature.candidature.individu.civilite = civ;
  //                   this.docCandidature.candidature.individu.nom = this.candidature.individu?.nom;
  //                   this.candidature.individu = this.individu;

  //                   if (this.selectedFile && this.posteSelectionne && this.selectedFile1 && this.nomDoc.nom && this.nomDoc1.nom) {
  //                     console.log(this.docCandidature.candidature.individu);

  //                     this.documentcandidatureService.uploadCvLm1(this.selectedFile, this.selectedFile1, this.nomDoc.nom, this.nomDoc1.nom, JSON.stringify(this.docCandidature.candidature.individu), postId)



  //                       .subscribe(
  //                         {
  //                           next: (response: any) => {


  //                             console.log('Upload successful', response);
  //                             const modalElement = document.getElementById('cart-modal');
  //                             if (modalElement) {
  //                               const modal = new bootstrap.Modal(modalElement);
  //                               modal.show();

  //                               const confirmButton = document.getElementById('confirmButton');

  //                               confirmButton?.addEventListener('click', () => {
  //                                 modal.hide();
  //                                 this.router.navigate(['/individu/register', response.idIndividu]);
  //                               }, { once: true });
  //                               const cancelButton = document.getElementById('cancelButton');

  //                               cancelButton?.addEventListener('click', () => {

  //                                 modal.hide();

  //                                 this.router.navigate(['/']);
  //                               }, { once: true });



  //                             }
  //                           },
  //                           error: (err) => {
  //                             console.error('Upload error', err);
  //                           }
  //                         }
  //                       );
  //                   }
  //                 }
  //               }
  //             }
  //           );
  //         }
  //       }
  //     }
  //   } else {
  //     console.error('No file selected or post not selected');
  //   }
  // }























































  uploadPdf(): void {
    console.log('step 1');
    let route = this.router;

    // Télécharger le premier fichier PDF
    if (this.selectedFile && this.posteSelectionne && this.selectedFile1) {
      const postId = this.posteSelectionne.id;
      if (postId) {
        if (this.nomDoc && this.nomDoc.nom && this.nomDoc1.nom) {
          if (this.individu
            && this.pays && this.pays.designation
            && this.civilite && this.civilite.designation
          ) {
            this.docCandidature.candidature = this.candidature
            this.candidature.individu = this.individu
            this.individu._id = this.candidat.individu?._id
            alert(this.candidat.individu?._id);
            forkJoin([
              this.paysService.getByDesignation(this.pays.designation),
              this.civiliteService.getByDesignation(this.civilite.designation),


            ]).subscribe(
              ([pes, civ]) => {
                if (pes && civ) {
                  alert(this.candidat.individu?._id);
                  alert("m2");
                  alert(this.candidat.individu?._id);
                  console.log(this.docCandidature);
                  if (this.docCandidature.candidature && this.docCandidature.candidature.individu
                  ) {
                    this.docCandidature.candidature.individu.pays = pes;
                    this.docCandidature.candidature.individu.civilite = civ
                    this.docCandidature.candidature.individu.nom = this.candidature.individu?.nom
                    this.candidature.individu = this.individu

                    alert("m3");
                    alert(this.candidat.individu?._id);
                    if (this.selectedFile && this.posteSelectionne && this.selectedFile1 && this.nomDoc.nom && this.nomDoc1.nom) {
                      console.log(this.docCandidature.candidature.individu)


                      this.documentcandidatureService.uploadCvLm1(this.selectedFile, this.selectedFile1, this.nomDoc.nom, this.nomDoc1.nom, JSON.stringify(this.docCandidature.candidature.individu), postId)

                        .subscribe(
                          (response: any) => {
                            console.log('Upload successful', response);

                            this.confirmService.showConfirm("Voulez-vous vraiment continuer ?",
                              () => {
                                this.router.navigate(['/individu/register', response.idIndividu]);
                              }, () => {
                                console.log('Bien enregistré');
                                this.router.navigate(['/']);
                              }

                            );
                          },
                          (err) => {
                            console.error('Upload error', err);
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

}



// uploadPdf(): void {
//   console.log('step 1');
//   let route = this.router;

//   // Télécharger le premier fichier PDF
//   if (this.selectedFile && this.posteSelectionne && this.selectedFile1) {
//     const postId = this.posteSelectionne.id;
//     if (postId) {
//       if (this.nomDoc && this.nomDoc.nom && this.nomDoc1.nom) {
//         if (this.individu
//           && this.pays && this.pays.designation
//           && this.civilite && this.civilite.designation
//         ) {
//           this.docCandidature.candidature = this.candidature
//           this.candidature.individu = this.individu
//           this.individu._id = this.candidat.individu?._id
//           alert(this.candidat.individu?._id);
//           forkJoin([
//             this.paysService.getByDesignation(this.pays.designation),
//             this.civiliteService.getByDesignation(this.civilite.designation),


//           ]).subscribe(
//             ([pes, civ]) => {
//               if (pes && civ) {
//                 alert(this.candidat.individu?._id);
//                 alert("m2");
//                 alert(this.candidat.individu?._id);
//                 console.log(this.docCandidature);
//                 if (this.docCandidature.candidature && this.docCandidature.candidature.individu
//                 ) {
//                   this.docCandidature.candidature.individu.pays = pes;
//                   this.docCandidature.candidature.individu.civilite = civ
//                   this.docCandidature.candidature.individu.nom = this.candidature.individu?.nom
//                   this.candidature.individu = this.individu

//                   alert("m3");
//                   alert(this.candidat.individu?._id);
//                   if (this.selectedFile && this.posteSelectionne && this.selectedFile1 && this.nomDoc.nom && this.nomDoc1.nom) {
//                     console.log(this.docCandidature.candidature.individu)

//                     this.documentcandidatureService.uploadCvLm1(this.selectedFile, this.selectedFile1, this.nomDoc.nom, this.nomDoc1.nom, JSON.stringify(this.docCandidature.candidature.individu), postId)
//                       .subscribe(
//                         {
//                           next(response: any) {
//                             console.log('Upload successful', response);

//                             // Affiche la boîte de dialogue de confirmation
//                             var userConfirmed = confirm("Voulez-vous vraiment continuer ?");

//                             // Vérifie la réponse de l'utilisateur
//                             if (userConfirmed) {
//                               alert("Vous avez cliqué sur OK");
//                               route.navigate(['/individu/register', response.idIndividu]);

//                             } else {

//                               route.navigate(['/'])
//                               console.log('bien enregistré');

//                             }



//                           },
//                           error(err) {
//                             console.error('Upload error', err);
//                           }
//                         }
//                       )


//                   }

//                 }
//               }
//             }
//           )
//         }
//       }

//     }
//   } else {
//     console.error('No file selected or post not selected');
//   }


// }

