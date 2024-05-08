import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveNomDocumentComponent } from './save-nom-document.component';

describe('SaveNomDocumentComponent', () => {
  let component: SaveNomDocumentComponent;
  let fixture: ComponentFixture<SaveNomDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveNomDocumentComponent]
    });
    fixture = TestBed.createComponent(SaveNomDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
