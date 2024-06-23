import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  currentUserEmail: string | null = null;

  private currentUserEmailSubject = new BehaviorSubject<string>('');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private individuService: IndividuService,
    private authService: AuthenticationService,
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

  getIndividuById(_id?: number) {


    console.log(_id);


  }














  submitUser(): void {
    if (!this.user.password) {
      console.error('Le mot de passe est requis.');
      return;
    }
    console.log("methode marche");
    console.log(this._id);
    this.individu._id = this._id
    //console.log(this.individu._id);
    if (this.individu._id) {
      console.log(this.individu._id);
      this.userService.addUserForIndividu(this.individu._id, this.user).subscribe(
        () => {
          console.log('Utilisateur enregistré avec succès.');
          this.user = new User();
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        });
    }


  }



}
