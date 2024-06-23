import { Injectable } from '@angular/core';
import { GestionCandidatureDto } from '../models/candidature/gestionCandidatureDto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonDocTestService {

  private baseUrl = 'http://localhost:1234/mon-doc';

  constructor(private http: HttpClient) { }



  uploadCvLm1(fileCV: File, fileLM: File, nomFileCV: string, nomFileLM: string, datas: string, postId: Number): Observable<GestionCandidatureDto> {
    const formData = new FormData();
    formData.append('fileCV', fileCV);
    formData.append('fileLM', fileLM);
    formData.append('nomFileCV', nomFileCV);
    formData.append('nomFileLM', nomFileLM);
    formData.append('datas', datas);
    formData.append('postId', postId.toString()); // Ajouter le postId à FormData

    const api = `${this.baseUrl}/upload`;
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
