import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCandidatureComponent } from './session-candidature.component';

describe('SessionCandidatureComponent', () => {
  let component: SessionCandidatureComponent;
  let fixture: ComponentFixture<SessionCandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionCandidatureComponent]
    });
    fixture = TestBed.createComponent(SessionCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
