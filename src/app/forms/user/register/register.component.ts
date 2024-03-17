import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Individu } from 'src/app/models/individu';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  individu = new Individu()
  user = new User();
  //erreurs: Array<String> = [];
  registerForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      telephone: [''],
      email: [''],
      password: ['']
    })
  }


  ngOnInit(): void {

  }

  registerUser() {

    //valeurs du formulaire
    this.user.individu = this.individu;
    this.user.individu.nom = this.registerForm.get('nom')?.value;
    this.user.individu.prenom = this.registerForm.get('prenom')?.value;
    this.user.individu.telephone = this.registerForm.get('telephone')?.value;
    this.user.email = this.registerForm.get('email')?.value;
    this.user.password = this.registerForm.get('password')?.value;




    //methode pour enregistrer

    console.log("toto")
    this.userService.signup(this.user)
      .subscribe(
        data => {
          console.log(data);
          alert("Vous êtes bien enregistré");
          this.router.navigate(['login']);
        },
        error => {
          console.error('Register failed : ', error);
          alert(error);

        }

      )

  }


}
