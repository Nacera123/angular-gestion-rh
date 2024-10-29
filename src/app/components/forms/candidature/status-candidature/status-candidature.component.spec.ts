import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCandidatureComponent } from './status-candidature.component';

describe('StatusCandidatureComponent', () => {
  let component: StatusCandidatureComponent;
  let fixture: ComponentFixture<StatusCandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCandidatureComponent]
    });
    fixture = TestBed.createComponent(StatusCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
