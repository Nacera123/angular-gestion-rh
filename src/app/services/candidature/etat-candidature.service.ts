import { Injectable } from '@angular/core';
import { EtatCandidature } from 'src/app/models/candidature/etatCandidature';

@Injectable({
  providedIn: 'root'
})
export class EtatCandidatureService {

  private etatCandidature!: EtatCandidature[]


  constructor() {
    this.etatCandidature = [];


  }
}
