import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SessionCandidature {

    private sessionCandidature!: SessionCandidature[];

    constructor() {
        this.sessionCandidature = [];
    }
}