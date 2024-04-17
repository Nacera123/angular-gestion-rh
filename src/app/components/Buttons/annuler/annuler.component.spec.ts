import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulerComponent } from './annuler.component';

describe('AnnulerComponent', () => {
  let component: AnnulerComponent;
  let fixture: ComponentFixture<AnnulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnulerComponent]
    });
    fixture = TestBed.createComponent(AnnulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
