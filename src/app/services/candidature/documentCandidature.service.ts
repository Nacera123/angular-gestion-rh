import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { DocumentCandidature } from "src/app/models/candidature/documentCandidature";
import { Gestion } from "src/app/models/candidature/gestion";
import { GestionCandidatureDto } from "src/app/models/candidature/gestionCandidatureDto";
import { EtatCivilEnum } from "src/app/models/enum/etatCivilEnum";
import { EtatCivilEnums } from "src/app/models/enum/testtest";

@Injectable({
    providedIn: 'root'
})

export class DocumentCandidatureService {

    private endpoint: string = 'http://localhost:1234/document-candidature';

    private baseUrl = 'http://localhost:1234/document-candidature';

    constructor(
        private readonly http: HttpClient,
    ) { }
    // Méthode pour uploader un PDF avec un postId
    uploadCvLm1(fileCV: File, fileLM: File, nomFileCV: string, nomFileLM: string, datas: string, postId: Number): Observable<any> {
        const formData = new FormData();
        formData.append('fileCV', fileCV);
        formData.append('fileLM', fileLM);
        formData.append('nomFileCV', nomFileCV);
        formData.append('nomFileLM', nomFileLM);
        formData.append('datas', datas);
        formData.append('postId', postId.toString()); // Ajouter le postId à FormData

        const api = `${this.baseUrl}/upload`;
        return this.http.post<any>(api, formData)
            .pipe(
                catchError(this.handleError) // Gestion des erreurs
            );
    }

    // Gestion des erreurs
    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error('An error occurred:', error.error.message);
        } else {
            // Erreur côté serveur
            console.log('erreur cote serveur : ', error.error.message);

            console.error(
                `Error Code: ${error.status}\n` +
                `Message: ${error.error}`
            );
        }
        return throwError(error.error);
    }


    //get liste document candidature
    getAll() {
        let api = `${this.endpoint}/list`;
        return this.http.get<DocumentCandidature[]>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error);
                    }

                )
            )
    }




}