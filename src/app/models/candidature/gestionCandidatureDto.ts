import { Civilite } from "../civilite";
import { EtatCivilEnum } from "../enum/etatCivilEnum";
import { EtatCivilEnums } from "../enum/testtest";
import { Pays } from "../pays";
import { NomDocument } from "./nomDocument";

export class GestionCandidatureDto {



    // pieceJointe?: String;
    // typePieceJointe?: NomDocument;


    // paysIndividu?: Pays;

    // nomIndividu?: String;
    // prenomIndividu?: String;
    // telephoneIndividu?: String;
    // emailIndividu?: String;
    // mdpIndividu?: String;


    // civilite?: Civilite;


    // nomPoste?: String;
    pieceJointe?: string;
    typePieceJointe?: string;
    nomIndividu?: string;
    prenomIndividu?: string;
    telephoneIndividu?: string;
    emailIndividu?: string;
    mdpIndividu?: string;
    paysIndividu?: string;
    civilite?: string;
    nomPoste?: string;

}