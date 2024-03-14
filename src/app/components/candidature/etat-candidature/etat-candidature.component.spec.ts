import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatCandidatureComponent } from './etat-candidature.component';

describe('EtatCandidatureComponent', () => {
  let component: EtatCandidatureComponent;
  let fixture: ComponentFixture<EtatCandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatCandidatureComponent]
    });
    fixture = TestBed.createComponent(EtatCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
