import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidature } from 'src/app/models/candidature/candidature';
import { CandidatureService } from 'src/app/services/candidature/candidature.service';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent implements OnInit {

  candidature: Candidature[] = [];
  candidatureSelectionne: Candidature | undefined;
  errorMessage: string = '';

  constructor(
    private candidatureService: CandidatureService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.getAllCandidature();
  }

  getAllCandidature() {

    this.candidatureService.getAll()
      .subscribe(
        response => {
          this.candidature = response;
          console.log(response);

        },
        (error) => {
          console.error(error);
          this.errorMessage = error;

        }
      )
  }

  getId(id?: Number) {


    console.log(id);
    if (id !== undefined) {
      this.candidatureService.getById(id).subscribe(
        (response: Candidature) => {
          // this.selected = response;
          this.candidatureSelectionne = response;
        }
      );
    } else {
      console.error('ID est undefined');
    }
  }
  // pagination 
  pageSize = 5;

  currentPage = 1;


  pageChanged(event: any): void {
    this.currentPage = event;
  }

}
