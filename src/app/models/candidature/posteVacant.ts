import { PosteDeTravail } from "./posteDeTravail";
import { SessionCandidature } from "./sessionCandidature";
import { TypeDeContrat } from "./typeDeContrat";

export class PosteVacant {


    id?: Number;

    nom?: String;

    descriptif?: String;

    session?: SessionCandidature;

    poste?: PosteDeTravail;

    typeContrat?: TypeDeContrat;

}