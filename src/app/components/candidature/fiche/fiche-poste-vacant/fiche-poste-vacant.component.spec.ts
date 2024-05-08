import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePosteVacantComponent } from './fiche-poste-vacant.component';

describe('FichePosteVacantComponent', () => {
  let component: FichePosteVacantComponent;
  let fixture: ComponentFixture<FichePosteVacantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichePosteVacantComponent]
    });
    fixture = TestBed.createComponent(FichePosteVacantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
