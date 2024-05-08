import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { NomDocument } from "src/app/models/candidature/nomDocument";

@Injectable({
    providedIn: 'root'
})

export class NomDocumentService {


    private endpoint: string = 'http://localhost:1234/nom-document'

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
            //console.log('Erreur côté serveur : ', error.statusText);
            console.log('test 1  : ', error.error.message);

            console.error(
                /// `Error Code: ${error.status}\n` +
                `Message: ${error.error}`
            );
        }
        return throwError(error.error.message);
    }

    //1- retourner la liste des nom de doc 
    getAll(): Observable<NomDocument[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<NomDocument[]>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {

                        console.log(this.handleError(error));

                        //console.error(this.handleError(error));
                        return this.handleError(error)

                    }
                )

            )
    }

    //2-  Ajouter un nom de document
    add(nomDocument: NomDocument) {
        let api = `${this.endpoint}/add`;
        return this.http.post<NomDocument>(api, nomDocument)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {

                        console.error(this.handleError(error));
                        return this.handleError(error)

                    }
                )
            )
    }

    //3- get by id
    getById(id: Number): Observable<NomDocument> {
        let api = `${this.endpoint}/${id}`
        return this.http.get<NomDocument>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {

                        console.error(this.handleError(error));
                        return this.handleError(error)

                    }
                )

            )
    }

    //4 - update
    update(nom: NomDocument): Observable<NomDocument> {
        let api = `${this.endpoint}/${nom.id}/update`

        return this.http.post<NomDocument>(api, nom)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        console.log(this.handleError(error));
                        return this.handleError(error);

                    }
                )
            )

    }

    //5- delete
    delete(id: Number): Observable<NomDocument> {
        let api = `${this.endpoint}/delete?id=${id}`
        return this.http.delete<NomDocument>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        console.log(this.handleError(error));
                        return this.handleError(error);

                    }
                )
            )
    }

}