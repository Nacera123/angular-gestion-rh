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



    constructor(
        private readonly htpp: HttpClient,
    ) { }


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
        return this.htpp.get<DocumentCandidature[]>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error);
                    }

                )
            )
    }

    // candidater
    add(gestionCandidatureDto: GestionCandidatureDto): Observable<GestionCandidatureDto> {
        const api = `${this.endpoint}/add`
        return this.htpp.post<GestionCandidatureDto>(api, gestionCandidatureDto)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }

                )
            )

    }
    getAllCivilEnum1(): Observable<any> {
        let api = `${this.endpoint}/enum`
        return this.htpp.get<any>(api);
    }

    getAllCivilEnum(): Observable<EtatCivilEnum[]> {
        let api = `${this.endpoint}/enum`
        return this.htpp.get<EtatCivilEnum[]>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }

                )
            )
    }

    enumDesignation(des: String): Observable<EtatCivilEnum> {
        const api = `${this.endpoint}/enum/${des}`;
        return this.htpp.get<GestionCandidatureDto>(api)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        return this.handleError(error)
                    }

                )
            )
    }
    // enumDesignationString(des: String): Observable<EtatCivilEnum> {
    //     const api = `${this.endpoint}/enum/string/${des}`;
    //     return this.  addCandidature(candidature: any, civilite: string, pays: string, nom: string): Observable<GestionCandidatureDto> {
    //         return this.http.post<GestionCandidatureDto>(`${this.apiUrl}/add?civilite=${civilite}&pays=${pays}&nom=${nom}`, candidature);
    //       }.get<GestionCandidatureDto>(api)
    //         .pipe(
    //             catchError(
    //                 (error: HttpErrorResponse) => {
    //                     return this.handleError(error)
    //                 }

    //             )
    //         )
    // }

    addCandidature(candidature: any, civilite: string, pays: string, nom: string): Observable<GestionCandidatureDto> {
        return this.htpp.post<GestionCandidatureDto>(`${this.endpoint}/add?civilite=${civilite}&pays=${pays}&nom=${nom}`, candidature);
    }




    uploadPdf(file: File, doc: string, postId: Number): Observable<DocumentCandidature> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doc', doc);
        formData.append('postId', postId.toString()); // Ajouter le postId à FormData

        const api = `${this.endpoint}/ajout`
        return this.htpp.post<DocumentCandidature>(api, formData)
            .pipe(
                catchError(this.handleError) // Gestion des erreurs
            );
    }
}