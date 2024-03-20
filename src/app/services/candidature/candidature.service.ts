import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError } from "rxjs";
import { Candidature } from "src/app/models/candidature/candidature";



@Injectable({
    providedIn: 'root'
})

export class CandidatureService {

    private candidature!: Candidature[];
    private endpoint: string = 'http://localhost:1234/candidature'

    constructor(
        private readonly http: HttpClient,
        private router: Router
    ) {
        this.candidature = [];

    }

    getAll(): Observable<Candidature[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<Candidature[]>(api)
            .pipe(
                catchError(
                    error => {
                        console.error('l\'erreur : ', error);
                        throw error

                    }
                )
            )
    }
}