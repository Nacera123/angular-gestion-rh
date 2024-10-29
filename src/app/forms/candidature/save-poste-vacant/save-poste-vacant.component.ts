import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import Quill from 'quill';
import { PosteDeTravail } from 'src/app/models/candidature/posteDeTravail';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { SessionCandidature } from 'src/app/models/candidature/sessionCandidature';
import { TypeDeContrat } from 'src/app/models/candidature/typeDeContrat';
import { PosteDeTravailService } from 'src/app/services/candidature/poste-de-travail.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';
import { sessionCandidatureService } from 'src/app/services/candidature/sessionCandidature.service';
import { TypeDeContratService } from 'src/app/services/candidature/type-de-contrat.service';

@Component({
  selector: 'app-save-poste-vacant',
  templateUrl: './save-poste-vacant.component.html',
  styleUrls: ['./save-poste-vacant.component.css']
})


export class SavePosteVacantComponent implements OnInit {
  errorMessage: string = '';



  //les variable dont j'ai besoin 
  posteVacant: PosteVacant = new PosteVacant();
  sessionCan: SessionCandidature = new SessionCandidature();
  posteDeTravail: PosteDeTravail = new PosteDeTravail();
  typeDeContrat: TypeDeContrat = new TypeDeContrat();
  sessionRef: String[] = [];
  posteNom: String[] = [];
  typeContratNom: String[] = [];
  quillEditor: any;
  editor: Quill | undefined;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    //les constructeur  dont j'ai besoin 
    private posteVacantService: PosteVacantService,
    private typeDeContratService: TypeDeContratService,
    private posteDeTravailService: PosteDeTravailService,
    private sessionService: sessionCandidatureService

  ) { }

  ngOnInit(): void {


    this.route.params
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.posteVacantService.getById(id).subscribe(data => {
            this.posteVacant = data;
            this.posteVacant.nom = data.nom;



            this.sessionCan.reference = data.session?.reference
            this.posteDeTravail.nom = data.poste?.nom
            this.typeDeContrat.type = data.typeContrat?.type
            this.editor?.clipboard.dangerouslyPasteHTML(this.posteVacant.descriptif?.toString() || '');
          });
        }
      });


    //1-recup session by ref
    this.sessionService.getAll().subscribe(
      (sessref) => {
        this.sessionRef = sessref
          .filter(sessref => sessref.reference !== undefined) // Filtrer les valeurs 'undefined'
          .map(sessref => sessref.reference!); // Utiliser le '!' pour indiquer que 'ref' ne sera pas 'undefined'

      },
      (error) => {
        console.error('Erreur lors de la récupération des sessions:', error);
      }
    );


    //2-recup poste by nom
    this.posteDeTravailService.getAll().subscribe(
      (nom) => {
        this.posteNom = nom
          .filter(nom => nom.nom !== undefined)
          .map(nom => nom.nom!);
      },
      (error) => {
        console.error('Erreur lors de la récupération poste de travail:', error);
      }
    );

    //3-recup typeDeContrat by type
    this.typeDeContratService.getAll().subscribe(
      (type) => {
        this.typeContratNom = type
          .filter(type => type.type !== undefined)
          .map(type => type.type!)
      },
      (error) => {
        console.error('Erreur lors de la récupération du type de contrat:', error);
      }
    )



    // Initialisation de l'éditeur Quill
    const editor = new Quill('.editor', {
      theme: 'snow' // Utilisez le thème "snow" pour une interface utilisateur plus simple
    });

    // Écoutez les changements de contenu de Quill
    editor.on('text-change', () => {
      // Mettez à jour le contenu de l'éditeur dans le modèle
      this.posteVacant.descriptif = editor.root.innerHTML;
    });

    this.editor = editor;
  }






  ajoutPoste(): void {
    if (this.sessionCan.reference && this.typeDeContrat.type && this.posteDeTravail.nom) {
      forkJoin([
        this.sessionService.getSessionByref(this.sessionCan.reference),
        this.typeDeContratService.getContratByType(this.typeDeContrat.type),
        this.posteDeTravailService.getPosteByNom(this.posteDeTravail.nom)
      ]).subscribe(
        ([ses, tyC, poTr]) => {
          this.posteVacant.session = ses;
          this.posteVacant.typeContrat = tyC;
          this.posteVacant.poste = poTr;

          if (this.posteVacant.id) {
            // Mise à jour
            this.posteVacantService.update(this.posteVacant).subscribe(
              (response) => {
                console.log('Poste vacant mis à jour avec succès', response);
                alert('Poste vacant mis à jour avec succès');
                this.router.navigate(['admin/poste-vacant']);
              },
              (error) => {
                console.error(error);
                this.errorMessage = error;
              }
            );
          } else {
            // Ajout
            this.posteVacantService.add(this.posteVacant).subscribe(
              (response) => {
                console.log('Poste vacant ajouté avec succès', response);
                alert('Poste vacant ajouté avec succès');
                this.router.navigate(['admin/poste-vacant']);
              },
              (error) => {
                console.error(error);
                this.errorMessage = error;
              }
            );
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des clés étrangères :', error);
        }
      );
    }
  }

}



//3- Methode register dont j'ai besoin
// ajoutPoste() {
//   if (this.sessionCan.reference && this.typeDeContrat.type && this.posteDeTravail.nom) {
//     forkJoin([
//       this.sessionService.getSessionByref(this.sessionCan.reference),
//       this.typeDeContratService.getContratByType(this.typeDeContrat.type),
//       this.posteDeTravailService.getPosteByNom(this.posteDeTravail.nom)
//     ]).subscribe(
//       ([ses, tyC, poTr]) => {
//         this.posteVacant.session = ses
//         this.posteVacant.typeContrat = tyC
//         this.posteVacant.poste = poTr

//         this.posteVacantService.add(this.posteVacant).subscribe(
//           (response) => {
//             console.log(' poste vacan bien ajouté ', response);
//             alert(' poste vacan bien ajouté ')

//           },
//           (error) => {
//             console.log('Erreur lors de la souscription des cles etrangeres:', error);

//             console.error('Erreur lors de la souscription des cles etrangeres :', error);
//           }
//         )
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération de l\'ID :', error);
//         console.log('Erreur lors de la récupération de l\'ID :', error);

//       }
//     )

//   }
// }


