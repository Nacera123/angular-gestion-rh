import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { NomDocument } from "src/app/models/candidature/nomDocument";
import { environment } from "src/environement/environement.dev";

@Injectable({
    providedIn: 'root'
})

export class NomDocumentService {


    // private endpoint: string = 'http://localhost:1234/nom-document'

    private endpoint = (environment.production)
        ? 'https://ws.nestech.fr/nom-document'
        : 'http://localhost:1234/nom-document';

    constructor(
        private readonly http: HttpClient
    ) { }


    ///gestion des erreur
    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error(' Erreur côté client: ', error.error.message);
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



    //1-liste des nom de document
    getAll(): Observable<NomDocument[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<NomDocument[]>(api)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            )
    }


    //2- ajout d'un poste de travail
    add(posteDeTravail: NomDocument): Observable<NomDocument> {
        let api = `${this.endpoint}/add`;
        return this.http.post<NomDocument>(api, posteDeTravail)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            );
    }


    //3- recuperation d'un poste de travail par id
    getById(id?: Number): Observable<NomDocument> {

        let api = `${this.endpoint}/${id}`;
        return this.http.get<NomDocument>(api)
            .pipe(
                catchError(
                    (error) => {
                        console.log(error);
                        throw error;

                    }
                )
            );
    }

    //3- recuperation d'un document par nom
    getByNom(nom?: String): Observable<NomDocument> {

        let api = `${this.endpoint}/detail/${nom}`;
        return this.http.get<NomDocument>(api)
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
    update(posteDeTravail: NomDocument): Observable<NomDocument> {
        let api = `${this.endpoint}/${posteDeTravail.id}/update`;
        return this.http.post<NomDocument>(api, posteDeTravail)
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
}