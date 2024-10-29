import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheCandidatureComponent } from './fiche-candidature.component';

describe('FicheCandidatureComponent', () => {
  let component: FicheCandidatureComponent;
  let fixture: ComponentFixture<FicheCandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheCandidatureComponent]
    });
    fixture = TestBed.createComponent(FicheCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
