import { HttpClient } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { PosteDeTravail } from "src/app/models/candidature/posteDeTravail";

@Injectable({
    providedIn: 'root'
})

export class PosteDeTravailService {

    private endpoint: string = 'http://localhost:1234/poste-de-travail'


    constructor(
        private readonly http: HttpClient
    ) { }

    //liste des poste de travail
    getAll(): Observable<PosteDeTravail[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<PosteDeTravail[]>(api)
            .pipe(
                catchError(
                    (error) => {
                        console.log(error);
                        throw error;

                    }
                )
            )
    }
}