import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCandidatureFicheComponent } from './session-candidature-fiche.component';

describe('SessionCandidatureFicheComponent', () => {
  let component: SessionCandidatureFicheComponent;
  let fixture: ComponentFixture<SessionCandidatureFicheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionCandidatureFicheComponent]
    });
    fixture = TestBed.createComponent(SessionCandidatureFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
