import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionCandidature } from 'src/app/models/candidature/sessionCandidature';
import { sessionCandidatureService } from 'src/app/services/candidature/sessionCandidature.service';

@Component({
  selector: 'app-save-session-candidature',
  templateUrl: './save-session-candidature.component.html',
  styleUrls: ['./save-session-candidature.component.css']
})
export class SaveSessionCandidatureComponent implements OnInit {

  form!: FormGroup;
  formulaire!: SessionCandidature;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sessionCandidatureService: sessionCandidatureService
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      reference: ['', Validators.required],
      dateOuverture: ['', Validators.required],
      dateCloture: ['', Validators.required],
      status: [true, Validators.required]
    });

    this.route.params
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.sessionCandidatureService.getById(id).subscribe(formulaire => {
            this.formulaire = formulaire;
            this.form.patchValue({
              reference: formulaire.reference,
              dateOuverture: formulaire.dateOuverture,
              dateCloture: formulaire.dateCloture,
              status: formulaire.status
            });
          });
        }
      }


      );
  }


  // save
  save(): void {
    const formulaire = this.form.value;

    if (this.formulaire && this.formulaire.id) {
      this.sessionCandidatureService.update({ id: this.formulaire.id, ...formulaire })
        .subscribe(() => {
          this.router.navigate(['admin/session-candidature']);
        },
          (error) => {
            console.error(error);
            this.errorMessage = error;

          }
        );
    } else {
      this.sessionCandidatureService.add(formulaire)
        .subscribe(
          () => {
            this.router.navigate(['admin/session-candidature']);
          },
          (error) => {
            console.error(error);
            this.errorMessage = error;

          }
        );
    }







    // this.sessionCandidatureService.add(formulaire)
    //   .subscribe(
    //     () => {
    //       this.router.navigate(['admin/session-candidature']);
    //     },
    //     (error) => {
    //       console.error(error);
    //       this.errorMessage = error;

    //     }
    //   );
  }




}
