import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PosteVacant } from 'src/app/models/candidature/posteVacant';
import { PosteVacantService } from 'src/app/services/candidature/poste-vacant.service';

@Component({
  selector: 'app-detail-offre',
  templateUrl: './detail-offre.component.html',
  styleUrls: ['./detail-offre.component.css']
})
export class DetailOffreComponent implements OnInit {

  /**
   * SafeHtml : interface utilisée pour sécuriter des modèles pour marquer une valeur HTML comme sûre pour le rendu dans le navigateur.
   Lorsque vous utilisez des données provenant de sources potentiellement non sécurisées, telles que:
          - des entrées utilisateur ou
          - des données provenant de services tiers,
    => faut  s'assurer que le contenu HTML ne présente pas de vulnérabilités de sécurité, ex:  l'injection de scripts malveillants.
  
  Angular fournit une fonctionnalité contre les attaques XSS (Cross-Site Scripting). 
  Le système de sécurité des modèles analyse et évalue les expressions de liaison et les valeurs HTML pour s'assurer qu'elles ne présentent pas de risque de sécurité.
  
  Lorsque vous utilisez des données HTML potentiellement non sécurisées dans votre application Angular, vous devez souvent les marquer comme "sûres" pour permettre leur rendu sans être filtrées par le système de sécurité des modèles.
  
  SafeHtml est l'une des interfaces que vous pouvez utiliser pour cela. Vous l'utilisez pour marquer une valeur HTML comme sûre. Par exemple, vous pouvez utiliser DomSanitizer pour marquer une chaîne HTML comme sûre avant de l'assigner à une propriété de modèle dans votre composant Angular.
   */

  posteVacant: PosteVacant[] = [];

  posteSelectionne: PosteVacant | undefined;

  contenuHtml: SafeHtml = '';


  constructor(
    private posteVacantService: PosteVacantService,
    private routeActivated: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    const id = this.routeActivated.snapshot.paramMap.get('id');

    if (id) {
      this.getPosteVacantById(Number(id));
    } else {
      console.log('id undefined');

    }
  }
  ngOnInit(): void {
    this.getPosteVacantById();
  }

  getPosteVacantById(id?: Number) {
    console.log(id);
    if (id !== undefined) {

      this.posteVacantService.getById(id).subscribe(
        (response: PosteVacant) => {
          this.posteSelectionne = response
          if (this.posteSelectionne.descriptif !== undefined && typeof this.posteSelectionne.descriptif === 'string') {

            this.contenuHtml = this.sanitizer.bypassSecurityTrustHtml(this.posteSelectionne.descriptif)
          } else {
            this.contenuHtml = '';
          }
        }
      )
    } else {
      console.log('Id undefined');

    }


  }

}
