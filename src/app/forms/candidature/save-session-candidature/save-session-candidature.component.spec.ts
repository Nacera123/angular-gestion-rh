import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSessionCandidatureComponent } from './save-session-candidature.component';

describe('SaveSessionCandidatureComponent', () => {
  let component: SaveSessionCandidatureComponent;
  let fixture: ComponentFixture<SaveSessionCandidatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveSessionCandidatureComponent]
    });
    fixture = TestBed.createComponent(SaveSessionCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
