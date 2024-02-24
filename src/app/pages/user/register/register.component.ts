import { Component, OnInit } from '@angular/core';
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
  erreurs: Array<String> = [];
  constructor(
    private userService: UserService
  ) {
  }


  ngOnInit(): void {

  }

  registerUser() {

    this.user.individu = this.individu
    console.log("toto")
    this.userService.signup(this.user).subscribe(data => {
      return alert("vous etes bien enregistré");
      console.log(data);
      /*erreur => {
        this.erreurs = erreur
      }*/
    })

  }


}
