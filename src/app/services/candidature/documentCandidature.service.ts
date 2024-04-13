import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { DocumentCandidature } from "src/app/models/candidature/documentCandidature";

@Injectable({
    providedIn: 'root'
})

export class DocumentCandidatureService {

    private endpoint: string = 'http://localhost:1234/document-candidature';



    constructor(
        private readonly htpp: HttpClient,
    ) { }



    //get liste document candidature
    getAll() {
        let api = `${this.endpoint}/list`;
        return this.htpp.get<DocumentCandidature[]>(api)
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