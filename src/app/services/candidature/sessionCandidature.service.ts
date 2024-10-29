import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { SessionCandidature } from "src/app/models/candidature/sessionCandidature";
import { environment } from "src/environement/environement.dev";

@Injectable({
    providedIn: 'root'
})

export class sessionCandidatureService {

    // private endpoint: string = 'http://localhost:1234/session-candidature';

    private endpoint = (environment.production)
        ? 'https://ws.nestech.fr/session-candidature'
        : 'http://localhost:1234/session-candidature';


    constructor(
        private readonly http: HttpClient,
        private router: Router
    ) { }


    // gestion des erreurs:
    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error('Erreur côté client: ', error.error.message);
        } else {
            // Erreur côté serveur
            console.log('Erreur côté serveur : ', error.statusText);
            console.log('test 1  : ', error.error.message);

            console.error(
                `Error Code: ${error.status}\n` +
                `Message: ${error.error}`
            );
        }
        return throwError(error.error);
    }

    // 1- get all  session des candidature
    getAll(): Observable<SessionCandidature[]> {
        let api = `${this.endpoint}/list`;

        return this.http.get<SessionCandidature[]>(api)
            .pipe(

                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })


            )
    }

    //2- Ajout d'une session des candidature
    add(session: SessionCandidature): Observable<SessionCandidature[]> {
        const api = `${this.endpoint}/add`;

        return this.http.post<SessionCandidature[]>(api, session)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {

                        console.error(this.handleError(error));
                        return this.handleError(error)

                    }
                )

            )
    }

    //3- recuperation d'un poste de travail par id
    getById(id?: Number): Observable<SessionCandidature> {

        let api = `${this.endpoint}/${id}`;
        return this.http.get<SessionCandidature>(api)
            .pipe(
                catchError(
                    (error) => {
                        console.log(error);
                        throw error;

                    }
                )
            );
    }


    //4- modification d'un poste de travail
    update(posteDeTravail: SessionCandidature): Observable<SessionCandidature> {
        let api = `${this.endpoint}/${posteDeTravail.id}/update`;
        return this.http.post<SessionCandidature>(api, posteDeTravail)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            );
    }


    //5- suppression d'un poste de travail
    delete(id?: Number) {
        let api = `${this.endpoint}/delete/${id}`;
        return this.http.delete<void>(api)
            .pipe(
                catchError(error => {
                    console.log(error);
                    throw error;
                })
            );


    }

    //6- recuperer la session par reference
    getSessionByref(ref: String): Observable<SessionCandidature> {
        let api = `${this.endpoint}/detail/${ref}`;
        return this.http.get<SessionCandidature>(api);
    }


}