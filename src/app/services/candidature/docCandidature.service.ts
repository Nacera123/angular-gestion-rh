import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { DocumentCandidature } from 'src/app/models/candidature/documentCandidature';
import { GestionCandidatureDto } from 'src/app/models/candidature/gestionCandidatureDto';
import { environment } from 'src/environement/environement.dev';


@Injectable({
    providedIn: 'root'
})
export class DocCandidatureService {

    // private baseUrl = 'http://localhost:1234/candidature';

    private baseUrl = (environment.production)
        ? 'https://ws.nestech.fr/candidature'
        : 'http://localhost:1234/candidature';
    constructor(private http: HttpClient) { }

    // Méthode pour uploader un PDF avec un postId
    uploadPdf(file: File, doc: string, postId: Number): Observable<DocumentCandidature> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doc', doc);
        formData.append('postId', postId.toString()); // Ajouter le postId à FormData

        const api = `${this.baseUrl}/upload`;
        return this.http.post<DocumentCandidature>(api, formData)
            .pipe(
                catchError(this.handleError) // Gestion des erreurs
            );
    }

    uploadCvLm(fileCV: File, fileLM: File, nomFileCV: string, nomFileLM: string, datas: string, postId: Number): Observable<any> {
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
    uploadCvLm1(fileCV: File, fileLM: File, nomFileCV: string, nomFileLM: string, datas: string, postId: Number): Observable<GestionCandidatureDto> {
        const formData = new FormData();
        formData.append('fileCV', fileCV);
        formData.append('fileLM', fileLM);
        formData.append('nomFileCV', nomFileCV);
        formData.append('nomFileLM', nomFileLM);
        formData.append('datas', datas);
        formData.append('postId', postId.toString()); // Ajouter le postId à FormData

        const api = `${this.baseUrl}/upload-user`;
        return this.http.post<GestionCandidatureDto>(api, formData)
            .pipe(
                catchError(this.handleError) // Gestion des erreurs
            );
    }


    // Gestion des erreurs
    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            console.error('Erreur côté client:', error.error.message);
        } else {
            // Erreur côté serveur
            console.error(
                `Code d'erreur: ${error.status}\n` +
                `Message: ${error.message}`
            );
        }
        return throwError(error.message || 'Erreur serveur');
    }


}