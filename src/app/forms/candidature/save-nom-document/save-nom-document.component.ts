import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NomDocument } from 'src/app/models/candidature/nomDocument';
import { NomDocumentService } from 'src/app/services/candidature/nomDocument.service';

@Component({
  selector: 'app-save-nom-document',
  templateUrl: './save-nom-document.component.html',
  styleUrls: ['./save-nom-document.component.css']
})
export class SaveNomDocumentComponent implements OnInit {
  formGroupe!: FormGroup
  nomDocument!: NomDocument
  errorMessage: string = ''

  constructor(
    private nomDocumentService: NomDocumentService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroupe = this.fb.group({
      nom: ['', Validators.required]
    });

    this.activatedRoute.params
      .subscribe(
        params => {
          const id = params['id'];
          if (id) {
            this.nomDocumentService.getById(id).subscribe(
              doc => {
                this.nomDocument = doc
                this.formGroupe.patchValue({
                  nom: doc.nom
                })
              }
            )
          }
        }
      )
  }

  create(): void {
    const formulaire = this.formGroupe.value;
    if (this.nomDocument && this.nomDocument.id) {
      this.nomDocumentService.update({ id: this.nomDocument.id, ...formulaire })
        .subscribe(
          () => {
            this.router.navigate(['admin/nom-document'])
          },
          (error) => {
            console.log(error);
            this.errorMessage = error

          }
        );
    } else {
      this.nomDocumentService.add(formulaire)
        .subscribe(
          () => {
            alert("le nom a bien ete ajouté")
            this.router.navigate(['admin/nom-document'])

          },
          (error) => {
            console.log(error);
            this.errorMessage = error

          }
        )
    }
  }
}
