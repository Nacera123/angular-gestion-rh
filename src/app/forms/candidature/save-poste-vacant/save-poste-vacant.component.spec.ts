import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePosteVacantComponent } from './save-poste-vacant.component';

describe('SavePosteVacantComponent', () => {
  let component: SavePosteVacantComponent;
  let fixture: ComponentFixture<SavePosteVacantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavePosteVacantComponent]
    });
    fixture = TestBed.createComponent(SavePosteVacantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
