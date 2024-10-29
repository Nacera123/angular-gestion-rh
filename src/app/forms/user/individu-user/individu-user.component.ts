import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Individu } from 'src/app/models/individu';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { IndividuService } from 'src/app/services/individu/individu.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-individu-user',
  templateUrl: './individu-user.component.html',
  styleUrls: ['./individu-user.component.css']
})
export class IndividuUserComponent implements OnInit {

  user: User = new User();
  individu: Individu = new Individu();
  individuSelect: Individu | undefined;
  _id: number | undefined;

  passwordError: string | null = null; // Ajoutez cette propriété

  currentUserEmail: string | null = null;

  private currentUserEmailSubject = new BehaviorSubject<string>('');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private individuService: IndividuService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      if (_id) {
        this._id = Number(_id);
        this.getIndividuById(this._id);
        this.individu._id = this._id



        console.log('id', this.individu._id);
        console.log('id2', this.individu.email);

        this.individuService.getById(Number(_id)).subscribe(
          data => {
            this.individuSelect = data
            console.log('individuSelect', data.email);



          }
        )
      } else {
        console.log('id undefined');
      }
    });


    this.authService.getUserEmail()?.subscribe(
      email => {
        this.currentUserEmail = email;

        console.log(this.currentUserEmail

        );

      }
    );


  }

  validatePassword() {
    const password = this.user.password;
    const lengthValid = password && password.length >= 8;
    const uppercaseValid = password && /[A-Z]/.test(password);
    const numberValid = password && /[0-9]/.test(password);

    // Réinitialisez l'erreur
    this.passwordError = null;

    if (!lengthValid) {
      this.passwordError = "Le mot de passe doit contenir au moins 8 caractères.";
    } else if (!uppercaseValid) {
      this.passwordError = "Le mot de passe doit contenir au moins une majuscule.";
    } else if (!numberValid) {
      this.passwordError = "Le mot de passe doit contenir au moins un chiffre.";
    }
  }

  get isPasswordRequired() {
    return !this.user.password;
  }

  get isPasswordLengthInvalid() {
    return this.user.password && this.user.password.length < 8;
  }

  get isPasswordUppercaseInvalid() {
    return this.user.password && !/[A-Z]/.test(this.user.password);
  }

  get isPasswordNumberInvalid() {
    return this.user.password && !/[0-9]/.test(this.user.password);
  }


  getIndividuById(_id?: number) {


    console.log(_id);


  }




  submitUser(): void {
    this.validatePassword(); // Validez le mot de passe avant la soumission

    // Si des erreurs de mot de passe existent, ne soumettez pas
    if (this.passwordError) {
      console.error('Erreur de validation du mot de passe:', this.passwordError);
      return;
    }

    this.individu._id = this._id;

    if (this.individu._id) {
      this.userService.addUserForIndividu(this.individu._id, this.user).subscribe(
        () => {
          console.log('Utilisateur enregistré avec succès.');
          this.user = new User();
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        });
    }
  }



  // submitUser(): void {

  //   if (!this.user.password) {
  //     console.error('Le mot de passe est requis.');
  //     return;
  //   }
  //   console.log("methode marche");
  //   console.log(this._id);
  //   this.individu._id = this._id
  //   if (this.individu._id) {
  //     console.log(this.individu._id);
  //     this.userService.addUserForIndividu(this.individu._id, this.user).subscribe(
  //       () => {
  //         console.log('Utilisateur enregistré avec succès.');
  //         this.user = new User();
  //         this.router.navigate(['/']);
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
  //       });
  //   }


  // }



}
