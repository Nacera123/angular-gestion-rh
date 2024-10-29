import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError } from "rxjs";
import { TypeDeContrat } from "src/app/models/candidature/typeDeContrat";
import { environment } from "src/environement/environement.dev";

@Injectable({
    providedIn: 'root'
})

export class TypeDeContratService {

    // private endpoint: string = 'http://localhost:1234/type-contrat'

    private endpoint = (environment.production)
        ? 'https://ws.nestech.fr/type-contrat'
        : 'http://localhost:1234/type-contrat';

    constructor(
        private readonly http: HttpClient,
        private router: Router
    ) {
        /// this.typeDeContrat = [];
    }



    getAll(): Observable<TypeDeContrat[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<TypeDeContrat[]>(api)
            .pipe(
                catchError(
                    error => {
                        console.error('erreur: ', error);
                        throw error

                    }
                )
            )
    }


    //2- recuperer la type de constrat par type
    getContratByType(type: String): Observable<TypeDeContrat> {
        let api = `${this.endpoint}/${type}`;
        return this.http.get<TypeDeContrat>(api);
    }

}