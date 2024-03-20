import { Component, OnInit } from '@angular/core';
import { TypeDeContrat } from 'src/app/models/candidature/typeDeContrat';
import { TypeDeContratService } from 'src/app/services/candidature/type-de-contrat.service';

@Component({
  selector: 'app-type-contrat',
  templateUrl: './type-contrat.component.html',
  styleUrls: ['./type-contrat.component.css']
})
export class TypeContratComponent implements OnInit {

  typeDeContrat: TypeDeContrat[] = [];


  constructor(
    private typeContratService: TypeDeContratService
  ) {

  }
  ngOnInit(): void {
    this.typeContratService.getAll()
      .subscribe(
        (response: TypeDeContrat[]) => {
          console.log(response);
          this.typeDeContrat = response;

        },
        (error) => {
          console.error(error);

        }
      )
  }

}
