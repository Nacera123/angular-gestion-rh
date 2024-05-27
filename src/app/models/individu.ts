import { Civilite } from "./civilite"
import { EtatCivilEnum } from "./enum/etatCivilEnum"
import { Pays } from "./pays"

export class Individu {
    public _id?: number
    public nom?: string
    public prenom?: string
    public dateDeNaissance?: Date
    public email?: string
    public telephone?: string
    public adresse?: string
    public cp?: number
    public ville?: string
    public nombreEnfant?: number
    public civilite?: Civilite;
    public pays?: Pays

}