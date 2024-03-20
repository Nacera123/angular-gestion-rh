import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PosteVacant {

    private posteVacant!: PosteVacant[];

    constructor() {
        this.posteVacant = [];
    }
}