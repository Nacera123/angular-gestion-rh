import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PosteDeTravail } from 'src/app/models/candidature/posteDeTravail';
import { PosteDeTravailService } from 'src/app/services/candidature/poste-de-travail.service';

@Component({
  selector: 'app-poste-de-travail',
  templateUrl: './poste-de-travail.component.html',
  styleUrls: ['./poste-de-travail.component.css']
})
export class PosteDeTravailAddComponent implements OnInit {

  form!: FormGroup;
  formulaire!: PosteDeTravail;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private posteDeTravailService: PosteDeTravailService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      reference: ['', Validators.required]
    });

    this.route.params
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.posteDeTravailService.getById(id).subscribe(formulaire => {
            this.formulaire = formulaire;
            this.form.patchValue({
              nom: formulaire.nom,
              reference: formulaire.reference
            });
          });
        }
      });
  }

  create(): void {
    const formulaire = this.form.value;
    if (this.formulaire && this.formulaire.id) {
      this.posteDeTravailService.update({ id: this.formulaire.id, ...formulaire })
        .subscribe(() => {
          this.router.navigate(['admin/poste-de-travail']);
        },
          (error) => {
            console.error(error);
            this.errorMessage = error;

          }
        );
    } else {
      this.posteDeTravailService.add(formulaire)
        .subscribe(
          () => {
            this.router.navigate(['admin/poste-de-travail']);
          },
          (error) => {
            console.error(error);
            this.errorMessage = error;

          }
        );
    }
  }

}
