import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError } from "rxjs";
import { SessionCandidature } from "src/app/models/candidature/sessionCandidature";

@Injectable({
    providedIn: 'root'
})

export class sessionCandidatureService {

    private endpoint: string = 'http://localhost:1234/session-candidature';

    constructor(
        private readonly http: HttpClient,
        private router: Router
    ) { }

    // recuperer la session des candidature
    getAll(): Observable<SessionCandidature[]> {
        let api = `${this.endpoint}/list`;

        return this.http.get<SessionCandidature[]>(api)
            .pipe(
                catchError(
                    error => {
                        console.error('l\'erreur : ', error);
                        throw error;

                    }
                )
            )
    }
}