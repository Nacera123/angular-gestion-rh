import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { DocumentCandidature } from "src/app/models/candidature/documentCandidature";

@Injectable({
    providedIn: 'root'
})

export class DocumentCandidatureService {

    private endpoint: string = 'http://localhost:1234/document-candidature';



    constructor(
        private readonly htpp: HttpClient,
    ) { }


    // Gestion des erreurs
    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error('An error occurred:', error.error.message);
        } else {
            // Erreur côté serveur
            console.log('toto : ', error.statusText);

            console.error(
                `Error Code: ${error.status}\n` +
                `Message: ${error.error}`
            );
        }
        return throwError(error.error);
    }


    //get liste document candidature
    getAll() {
        let api = `${this.endpoint}/list`;
        return this.htpp.get<DocumentCandidature[]>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error);
                    }

                )
            )
    }




}