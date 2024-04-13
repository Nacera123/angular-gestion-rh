import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PosteVacant {

    private endpoint: string = 'http://localhost:1234/poste-vacant';

    constructor(
        private readonly http: HttpClient
    ) { }

    //1- get liste poste vacant:
    getAll() {
        let api = `${this.endpoint}/list`
        return this.http.get<PosteVacant[]>(api)
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