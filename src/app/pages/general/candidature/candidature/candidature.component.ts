import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/models/candidature/candidature';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  candidature: Candidature[] = [];



  errorMessage: string = '';

  constructor(
    private readonly http: HttpClient,
    private candidatureService: CandidatureService
  ) { }



  ngOnInit(): void {

    this.getAllCandidature();

  }

  getAllCandidature() {

    this.candidatureService.getAll()
      .subscribe(
        (response: Candidature[]) => {
          console.log(response);
          this.candidature = response;

        },
        (error) => {
          console.error(error);
          this.errorMessage = error;

        }
      )
  }

  // pagination 
  pageSize = 10;

  currentPage = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }


}
