import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomDocumentComponent } from './nom-document.component';

describe('NomDocumentComponent', () => {
  let component: NomDocumentComponent;
  let fixture: ComponentFixture<NomDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NomDocumentComponent]
    });
    fixture = TestBed.createComponent(NomDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
