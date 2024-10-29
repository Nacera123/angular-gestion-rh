import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as saveAs from 'file-saver';
import { Candidature } from 'src/app/models/candidature/candidature';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';
import { DocumentCandidatureService } from 'src/app/services/candidature/documentCandidature.service';

@Component({
  selector: 'app-document-candidature',
  templateUrl: './document-candidature.component.html',
  styleUrls: ['./document-candidature.component.css']
})
export class DocumentCandidatureComponent implements OnInit {


  documentCandidature: DocumentCandidature[] = [];
  posteSelectionne: DocumentCandidature = new DocumentCandidature();
  doc: DocumentCandidature = new DocumentCandidature();


  errorMessage: string = '';


  //gestion pagination
  pageSize = 10;

  currentPage = 1;

  candidatureTab: Number[] = [];
  candidatTab: Number[] = [];



  pageChanged(event: any): void {
    this.currentPage = event;
  }


  constructor(
    private documentCandidatureService: DocumentCandidatureService,
    // private fileService: FileService, 
    private sanitizer: DomSanitizer,
    private candidatureService: CandidatureService,
  ) {
  }

  ngOnInit(): void {
    this.getAllDocument();
    // this.getDocuments();

    // this.candidatureService.getAll().subscribe(
    //   data => {
    //     this.candidatTab = data
    //       .filter(data => data.id !== undefined)
    //       .map(data => data.id!)

    //     console.log('id candidature', data);
    //     this.getByIdDoc();
    //   }
    // )

  }

  // getDocuments1(): void {
  //   this.documentCandidatureService.getAll().subscribe(
  //     (data: DocumentCandidature[]) => {
  //       this.documentCandidature = data;
  //       console.log('Documents récupérés : ', data);
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des documents', error);
  //     }
  //   );
  // }

  splitFilenames(nomPieceJointe?: string): string[] {
    if (nomPieceJointe) {
      return nomPieceJointe.split('  ');
    } else {
      return [];
    }
  }


  //get by id
  // getByIdDoc() {
  //   this.candidatTab.forEach(id => {
  //     console.log('ID de candidature:', id);
  //     this.documentCandidatureService.getByIdCandidature(id).subscribe(
  //       data => {
  //         console.log(data);
  //         this.documentCandidature.push(data);
  //       }
  //     )
  //   });
  // }




  // recuperer la liste des document de candidature
  getAllDocument() {


    this.documentCandidatureService.getAll()
      .subscribe(
        (response: DocumentCandidature[]) => {
          this.documentCandidature = response

        },
        (error) => {
          console.error(error);
          this.errorMessage = error

        }
      )
  }





  getId(id?: Number) {


    console.log(id);
    if (id !== undefined) {
      this.documentCandidatureService.getById(id).subscribe(
        (response: DocumentCandidature) => {
          // this.selected = response;
          this.posteSelectionne = response;
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }







  // Méthode pour télécharger le fichier
  downloadFile(filePath: string) {
    this.documentCandidatureService.downloadFile1(filePath)
      .subscribe(
        (response: Blob) => {
          saveAs(response, this.getFileName(filePath));
        },
        (error) => {
          console.error('Erreur de téléchargement de fichier :', error);
          this.errorMessage = 'Erreur de téléchargement de fichier. Veuillez réessayer plus tard.';
        }
      );
  }

  // Méthode pour extraire le nom du fichier à partir du chemin
  private getFileName(filePath: string): string {
    return filePath.split('/').pop() || 'downloaded-file';
  }





  fileUrl: SafeUrl | null = null;


  test(filePath: string): void {
    this.documentCandidatureService.test(filePath).subscribe(
      response => {
        console.log('cool');


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











  // getDocuments(): void {
  //   this.documentCandidatureService.getAllDocumentsByCandidature().subscribe(
  //     (data: DocumentCandidature[]) => {
  //       this.documentCandidature = data;
  //       console.log('Données récupérées : ', data);
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des documents', error);
  //     }
  //   );
  // }


}
