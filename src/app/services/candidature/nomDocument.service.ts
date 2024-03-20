import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class NomDocument {

    private nomDocument!: NomDocument[];


    constructor() {
        this.nomDocument = [];
    }
}