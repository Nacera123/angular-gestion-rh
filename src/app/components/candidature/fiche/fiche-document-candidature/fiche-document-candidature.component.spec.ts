import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDocumentCandidatureComponent } from './fiche-document-candidature.component';

describe('FicheDocumentCandidatureComponent', () => {
  let component: FicheDocumentCandidatureComponent;
  let fixture: ComponentFixture<FicheDocumentCandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheDocumentCandidatureComponent]
    });
    fixture = TestBed.createComponent(FicheDocumentCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
