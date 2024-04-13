import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCandidatureComponent } from './document-candidature.component';

describe('DocumentCandidatureComponent', () => {
  let component: DocumentCandidatureComponent;
  let fixture: ComponentFixture<DocumentCandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentCandidatureComponent]
    });
    fixture = TestBed.createComponent(DocumentCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
