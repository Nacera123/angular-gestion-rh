import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { NomDocument } from "src/app/models/candidature/nomDocument";

@Injectable({
    providedIn: 'root'
})

export class NomDocumentService {


    private endpoint: string = 'http://localhost:1234/nom-document'

    constructor(
        private readonly http: HttpClient
    ) { }


    //retourner la liste des nom de doc 
    getAll(): Observable<NomDocument[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<NomDocument[]>(api)
            .pipe(
                catchError(
                    error => {
                        console.error(error);
                        throw error;

                    }
                )
            )
    }
}