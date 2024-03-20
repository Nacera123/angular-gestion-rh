import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PosteDeTravail {

    private posteDeTravail!: PosteDeTravail[];


    constructor() {
        this.posteDeTravail = [];
    }
}