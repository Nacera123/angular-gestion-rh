import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
      nom: [''],
      prenom: [''],
      telephone: [''],
      email: [''],
      password: ['', this.passwordValidator]
    })
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const idIndividu = params["idIndividu"];
      console.log(idIndividu);

      if (idIndividu) {
        alert("coucou : " + idIndividu);
      }
    });
  }
  passwordValidator(control: any) {
    const password = control.value;
    const lengthValid = password && password.length >= 8;
    const uppercaseValid = password && /[A-Z]/.test(password);
    const numberValid = password && /[0-9]/.test(password);

    const errors = {
      length: !lengthValid,
      uppercase: !uppercaseValid,
      number: !numberValid
    };

    // Return errors if any validation fails
    return lengthValid && uppercaseValid && numberValid ? null : errors;
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
          //this.router.navigate(['login']);
        },
        error => {
          console.error('Register failed : ', error);
          alert(error);

        }

      )

  }


}
