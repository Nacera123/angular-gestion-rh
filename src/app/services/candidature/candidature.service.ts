import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { Candidature } from "src/app/models/candidature/candidature";
import { environment } from "../../../environement/environement.dev";


@Injectable({
    providedIn: 'root'
})

export class CandidatureService {

    private readonly endpoint = (environment.production)
        ? 'https://ws.nestech.fr/candidature'
        : 'http://localhost:1234/candidature';

    // private endpoint: string = 'http://localhost:1234/candidature'

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
        let api = `${this.endpoint}/byid/${id}`;
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



    getByNomPosteVacant(nom: String) {
        const formattedNom = this.cleanNameForUrl(nom.toString());
        let api = `${this.endpoint}/poste-vacant/${nom}`;
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


    cleanNameForUrl(name: string): string {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')  // Remplace les espaces par des tirets
            .replace(/[^\w-]/g, '');  // Supprime les caractères non-alphanumériques sauf les tirets
    }



    //3- recuperation d'un poste de travail par id
    getById(id?: Number): Observable<Candidature> {

        let api = `${this.endpoint}/list/${id}`;
        return this.http.get<Candidature>(api)
            .pipe(
                catchError(
                    (error) => {
                        console.log(error);
                        throw error;

                    }
                )
            );
    }

}