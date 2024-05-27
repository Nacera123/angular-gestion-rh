import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDocumentCandidatureComponent } from './save-document-candidature.component';

describe('SaveDocumentCandidatureComponent', () => {
  let component: SaveDocumentCandidatureComponent;
  let fixture: ComponentFixture<SaveDocumentCandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveDocumentCandidatureComponent]
    });
    fixture = TestBed.createComponent(SaveDocumentCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
