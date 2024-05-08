import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { PosteDeTravail } from "src/app/models/candidature/posteDeTravail";

@Injectable({
    providedIn: 'root'
})

export class PosteDeTravailService {

    private endpoint: string = 'http://localhost:1234/poste-de-travail'


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



    //1-liste des poste de travail
    getAll(): Observable<PosteDeTravail[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<PosteDeTravail[]>(api)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            )
    }


    //2- ajout d'un poste de travail
    add(posteDeTravail: PosteDeTravail): Observable<PosteDeTravail> {
        let api = `${this.endpoint}/add`;
        return this.http.post<PosteDeTravail>(api, posteDeTravail)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            );
    }


    //3- recuperation d'un poste de travail par id
    getById(id?: Number): Observable<PosteDeTravail> {

        let api = `${this.endpoint}/${id}`;
        return this.http.get<PosteDeTravail>(api)
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
    update(posteDeTravail: PosteDeTravail): Observable<PosteDeTravail> {
        let api = `${this.endpoint}/${posteDeTravail.id}/update`;
        return this.http.post<PosteDeTravail>(api, posteDeTravail)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            );
    }
    // update(posteDeTravail: PosteDeTravail): Observable<PosteDeTravail> {
    //     let api = `${this.endpoint}/${posteDeTravail.id}/update`;
    //     return this.http.post<PosteDeTravail>(api, posteDeTravail)
    //         .pipe(
    //             catchError(
    //                 (error) => {
    //                     console.log(error);
    //                     throw error;
    //                 }
    //             )
    //         );
    // }

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
    // - suppression d'un poste de travail
    // delete(id?: Number): Observable<void> {
    //     let api = `${this.endpoint}/delete/${id}`;
    //     return this.http.delete<void>(api)
    //         .pipe(
    //             catchError(
    //                 (error) => {
    //                     console.log(error);
    //                     throw error;
    //                 }
    //             )
    //         );
    // }


    //6- recuperer la poste par nom
    getPosteByNom(nom: String): Observable<PosteDeTravail> {
        let api = `${this.endpoint}/detail/${nom}`;
        return this.http.get<PosteDeTravail>(api);
    }


}