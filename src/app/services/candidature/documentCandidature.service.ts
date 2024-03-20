import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DocumentCandidature {

    private documentCandidature!: DocumentCandidature[];
    //private endpoint: string = 'http://localhost:1234/individu';



    constructor() {
        this.documentCandidature = [];
    }




}