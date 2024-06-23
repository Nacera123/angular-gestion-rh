import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Candidats } from 'src/app/models/candidature/candidats';
import { Candidature } from 'src/app/models/candidature/candidature';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { NomDocument } from 'src/app/models/candidature/nomDocument';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { Civilite } from 'src/app/models/civilite';
import { Individu } from 'src/app/models/individu';
import { Pays } from 'src/app/models/pays';
import { NomDocumentService } from 'src/app/services/candidature/nomDocument.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { CiviliteService } from 'src/app/services/individu/civilite.service';
import { PaysService } from 'src/app/services/individu/pays.service';
import { MonDocTestService } from 'src/app/services/mon-doc-test.service';

@Component({
  selector: 'app-mon-doc-test',
  templateUrl: './mon-doc-test.component.html',
  styleUrls: ['./mon-doc-test.component.css']
})
export class MonDocTestComponent implements OnInit {

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


  constructor(
    private activatedRoute: ActivatedRoute,
    private posteService: PosteVacantService,
    private nomDocService: NomDocumentService,
    private paysService: PaysService,
    private civiliteService: CiviliteService,
    private router: Router,
    private monDocTestService: MonDocTestService,
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
                  alert("m2");
                  console.log(this.docCandidature);
                  if (this.docCandidature.candidature && this.docCandidature.candidature.individu
                  ) {
                    this.docCandidature.candidature.individu.pays = pes;
                    this.docCandidature.candidature.individu.civilite = civ
                    this.docCandidature.candidature.individu.nom = this.candidature.individu?.nom
                    this.candidature.individu = this.individu

                    alert("m3");
                    if (this.selectedFile && this.posteSelectionne && this.selectedFile1 && this.nomDoc.nom && this.nomDoc1.nom) {
                      console.log(this.docCandidature.candidature.individu)

                      this.monDocTestService.uploadCvLm1(this.selectedFile, this.selectedFile1, this.nomDoc.nom, this.nomDoc1.nom, JSON.stringify(this.docCandidature.candidature.individu), postId)
                        .subscribe(
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
                                route.navigate(['/'])
                                console.log('bien enregistré');

                              }

                            },
                            error(err) {
                              console.error('Upload error', err);
                            }
                          }
                        )

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


