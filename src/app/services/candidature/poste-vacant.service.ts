import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { PosteVacant } from "src/app/models/candidature/posteVacant";
import { environment } from "src/environement/environement.dev";

@Injectable({
    providedIn: 'root'
})

export class PosteVacantService {

    // private endpoint: string = 'http://localhost:1234/poste-vacant';

    private endpoint = (environment.production)
        ? 'https://ws.nestech.fr/poste-vacant'
        : 'http://localhost:1234/poste-vacant';

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

    //1- get liste poste vacant:
    getAll(): Observable<PosteVacant[]> {
        let api = `${this.endpoint}/list`
        return this.http.get<PosteVacant[]>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {

                        console.error(this.handleError(error));
                        return this.handleError(error)

                    }
                )
            )
    }

    //2- Ajout
    add(posteVacant: PosteVacant): Observable<PosteVacant[]> {
        let api = `${this.endpoint}/add`;

        return this.http.post<PosteVacant[]>(api, posteVacant)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            );
    }

    //3- recuperer le poste vacant par Id
    getById(id: Number): Observable<PosteVacant> {
        let api = `${this.endpoint}/${id}`

        return this.http.get<PosteVacant>(api)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            );

    }

    //4- modification d'un poste de travail
    update(posteDeTravail: PosteVacant): Observable<PosteVacant> {
        let api = `${this.endpoint}/${posteDeTravail.id}/update`;
        return this.http.post<PosteVacant>(api, posteDeTravail)
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