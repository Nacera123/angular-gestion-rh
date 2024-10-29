import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { DocumentCandidature } from "src/app/models/candidature/documentCandidature";
import { Gestion } from "src/app/models/candidature/gestion";
import { GestionCandidatureDto } from "src/app/models/candidature/gestionCandidatureDto";
import { EtatCivilEnum } from "src/app/models/enum/etatCivilEnum";
import { EtatCivilEnums } from "src/app/models/enum/testtest";
import { environment } from "src/environement/environement.dev";

@Injectable({
    providedIn: 'root'
})

export class DocumentCandidatureService {

    // private endpoint: string = 'http://localhost:1234/document-candidature';

    // private baseUrl = 'http://localhost:1234/document-candidature';



    // private testUrl = 'http://localhost:1234/test';




    private endpoint = (environment.production)
        ? 'https://ws.nestech.fr/document-candidature'
        : 'http://localhost:1234/document-candidature';
    private baseUrl = (environment.production)
        ? 'https://ws.nestech.fr/document-candidature'
        : 'http://localhost:1234/document-candidature';
    private testUrl = (environment.production)
        ? 'https://ws.nestech.fr/test'
        : 'http://localhost:1234/test';

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
    getAll(): Observable<DocumentCandidature[]> {
        let api = `${this.endpoint}/list`;
        return this.http.get<DocumentCandidature[]>(api)
            .pipe(

                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })

            )
    }




    // Méthode pour télécharger un fichier
    downloadFile1(filePath: string): Observable<Blob> {
        const api = `${this.baseUrl}/toto/${filePath}`;

        const options = {
            responseType: 'blob' as 'json',

        };

        return this.http.get<Blob>(api, options)
            .pipe(
                catchError((error: any) => this.handleErrorBlob(error))
            );
    }






    // Méthode pour télécharger un fichier
    downloadFile(filePath: string): Observable<Blob> {
        const api = `${this.baseUrl}/download/${filePath}`;

        // Définir les options pour le téléchargement du fichier
        const options = {
            responseType: 'blob' as 'json', // Le type de réponse est un blob (fichier)




            // headers: new HttpHeaders({
            //     'Content-Type': 'application/json',
            //     Accept: 'application/pdf, application/octet-stream'
            // })
        };

        return this.http.get<Blob>(api, options)
            .pipe(
                catchError((error: any) => this.handleErrorBlob(error))
            );
    }

    // Gestion des erreurs pour les réponses de type Blob (fichier)
    private handleErrorBlob(error: HttpErrorResponse): Observable<any> {
        console.error('Erreur de téléchargement de fichier :', error);
        return throwError('Erreur de téléchargement de fichier. Veuillez réessayer plus tard.');
    }








    test(filePath: string) {
        const api = `${this.testUrl}/toto/mimi/${filePath}`;
        return this.http.get(api, { responseType: 'blob' });
    }




    //3- recuperation d'un poste de travail par id
    getById(id?: Number): Observable<DocumentCandidature> {

        let api = `${this.endpoint}/document/${id}`;
        return this.http.get<DocumentCandidature>(api)
            .pipe(
                catchError(
                    (error) => {
                        console.log(error);
                        throw error;

                    }
                )
            );
    }


    //4- recuperation d'un poste de travail par id
    getByIdCandidature(id?: Number): Observable<DocumentCandidature[]> {

        let api = `${this.endpoint}/by-candidature/${id}`;
        return this.http.get<DocumentCandidature[]>(api)
            .pipe(
                catchError(
                    (error) => {
                        console.log(error);
                        throw error;

                    }
                )
            );
    }

    getAllDocumentsByCandidature(): Observable<DocumentCandidature> {
        return this.http.get<DocumentCandidature>(`${this.baseUrl}/by-candidature`);
    }




}