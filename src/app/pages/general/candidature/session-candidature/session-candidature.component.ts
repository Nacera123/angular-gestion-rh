import { Component, OnInit } from '@angular/core';
import { SessionCandidature } from 'src/app/models/candidature/sessionCandidature';
import { sessionCandidatureService } from 'src/app/services/candidature/sessionCandidature.service';

@Component({
  selector: 'app-session-candidature',
  templateUrl: './session-candidature.component.html',
  styleUrls: ['./session-candidature.component.css']
})
export class SessionCandidatureComponent implements OnInit {

  sessionCandidature: SessionCandidature[] = [];

  constructor(
    private sessionCandidatureService: sessionCandidatureService
  ) { }

  ngOnInit(): void {

    this.sessionCandidatureService.getAll()
      .subscribe(
        (response: SessionCandidature[]) => {
          console.log(response);
          this.sessionCandidature = response
        },
        (error) => {
          console.error(error);

        }
      )
  }

}
