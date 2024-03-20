import { PosteDeTravail } from "./posteDeTravail";
import { SessionCandidature } from "./sessionCandidature";
import { TypeDeContrat } from "./typeDeContrat";

export class PosteVacant {


    id?: Number;

    descriptif?: String;

    session?: SessionCandidature;

    postes?: PosteDeTravail;

    typeContrat?: TypeDeContrat;

}