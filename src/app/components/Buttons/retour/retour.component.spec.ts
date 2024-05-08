import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourComponent } from './retour.component';

describe('RetourComponent', () => {
  let component: RetourComponent;
  let fixture: ComponentFixture<RetourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetourComponent]
    });
    fixture = TestBed.createComponent(RetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
