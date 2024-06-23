import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividuUserComponent } from './individu-user.component';

describe('IndividuUserComponent', () => {
  let component: IndividuUserComponent;
  let fixture: ComponentFixture<IndividuUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividuUserComponent]
    });
    fixture = TestBed.createComponent(IndividuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
