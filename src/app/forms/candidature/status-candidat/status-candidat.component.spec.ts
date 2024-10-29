import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCandidatComponent } from './status-candidat.component';

describe('StatusCandidatComponent', () => {
  let component: StatusCandidatComponent;
  let fixture: ComponentFixture<StatusCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCandidatComponent]
    });
    fixture = TestBed.createComponent(StatusCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
