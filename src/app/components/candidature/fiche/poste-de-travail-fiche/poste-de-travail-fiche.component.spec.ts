import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteDeTravailFicheComponent } from './poste-de-travail-fiche.component';

describe('PosteDeTravailFicheComponent', () => {
  let component: PosteDeTravailFicheComponent;
  let fixture: ComponentFixture<PosteDeTravailFicheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosteDeTravailFicheComponent]
    });
    fixture = TestBed.createComponent(PosteDeTravailFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
