import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { GestionCandidatureDto } from 'src/app/models/candidature/gestionCandidatureDto';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { DocCandidatureService } from 'src/app/services/candidature/docCandidature.service';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent {
  // pdfInfo: DocumentCandidature = new DocumentCandidature();
  // pdfInfo1: DocumentCandidature = new DocumentCandidature();

  pdfInfo: GestionCandidatureDto = new GestionCandidatureDto();
  pdfInfo1: GestionCandidatureDto = new GestionCandidatureDto();





  selectedFile: File | null = null;
  selectedFile1: File | null = null;
  toto: string = '';
  toto1: string = '';
  posteSelectionne: PosteVacant | undefined;

  constructor(
    private docCandidatureService: DocCandidatureService,
    private routeActivated: ActivatedRoute,
    private posteService: PosteVacantService,
  ) { }

  ngOnInit(): void {
    const id = this.routeActivated.snapshot.paramMap.get('id');
    if (id) {
      this.getPosteById(Number(id));
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
    
    // Télécharger le premier fichier PDF
    if (this.selectedFile && this.posteSelectionne && this.selectedFile1) {
      const postId = this.posteSelectionne.id;
      if (postId) {
        this.docCandidatureService.uploadCvLm(this.selectedFile,this.selectedFile1,  this.toto, postId).subscribe(
         {
            next(response: DocumentCandidature) {
              console.log('Upload successful', response);
              //this.pdfInfo = response;
            },
            error(err) {
              console.error('Upload error', err);
            },
         } 
        );
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
