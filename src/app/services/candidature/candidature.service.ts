import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { Candidature } from "src/app/models/candidature/candidature";



@Injectable({
    providedIn: 'root'
})

export class CandidatureService {


    private endpoint: string = 'http://localhost:1234/candidature'

    constructor(
        private readonly http: HttpClient,
    ) { }

    // gestion des erreurs:
    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error('Erreur côté client: ', error.error.message);
        } else {
            // Erreur côté serveur
            console.log('Erreur côté serveur : ', error.statusText);

            console.error(
                `Error Code: ${error.status}\n` +
                `Message: ${error.error}`
            );
        }
        return throwError(error.error);
    }


    //1-liste des candidatures
    getAll(): Observable<Candidature[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<Candidature[]>(api)
            .pipe(
                catchError(
                    error => {
                        console.error('l\'erreur : ', error);
                        throw error;

                    }
                )
            )
    }

    getByIndividu(id: number): Observable<Candidature[]> {
        let api = `${this.endpoint}/b/${id}`;
        return this.http.get<Candidature[]>(api)
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