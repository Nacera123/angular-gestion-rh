import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreDeTravailComponent } from './offre-de-travail.component';

describe('OffreDeTravailComponent', () => {
  let component: OffreDeTravailComponent;
  let fixture: ComponentFixture<OffreDeTravailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreDeTravailComponent]
    });
    fixture = TestBed.createComponent(OffreDeTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
