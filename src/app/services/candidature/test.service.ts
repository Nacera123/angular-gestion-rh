import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { Candidature } from "src/app/models/candidature/candidature";
import { DocumentCandidature } from "src/app/models/candidature/documentCandidature";
import { TestDto } from "src/app/models/candidature/testDto";



@Injectable({
    providedIn: 'root'
})

export class TestService {
    private endpoint: string = 'http://localhost:1234/testtest';


    constructor(
        private readonly http: HttpClient
    ) { }


    // gestion des erreurs:
    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error('Erreur côté client: ', error.error.message);
        } else {
            // Erreur côté serveur
            console.log('Erreur côté serveur : ', error.statusText);
            console.log('mon test : ', error);

            console.error(
                `Error Code: ${error.status}\n` +
                `Message: ${error.error}` +
                `MessageTest: ${error.error.message}`
            );
        }
        return throwError(error.error);
    }

    //2- Ajout
    add(test: DocumentCandidature, nom: String): Observable<DocumentCandidature> {
        let api = `${this.endpoint}/add`;
        const params = new HttpParams().set('nom', nom as string);

        return this.http.post<DocumentCandidature>(api, test, { params })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            );
    }
    // add1(test: DocumentCandidature): Observable<DocumentCandidature> {
    //     let api = `${this.endpoint}/add1`;


    //     return this.http.post<DocumentCandidature>(api, test)
    //         .pipe(
    //             catchError((error: HttpErrorResponse) => {
    //                 return this.handleError(error);
    //             })

    //         );
    // }
    add1(test: DocumentCandidature, posteId: Number): Observable<DocumentCandidature> {
        let api = `${this.endpoint}/add1?posteId=${posteId}`;

        return this.http.post<DocumentCandidature>(api, test)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })
            );
    }


}