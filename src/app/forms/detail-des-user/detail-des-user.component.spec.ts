import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDesUserComponent } from './detail-des-user.component';

describe('DetailDesUserComponent', () => {
  let component: DetailDesUserComponent;
  let fixture: ComponentFixture<DetailDesUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDesUserComponent]
    });
    fixture = TestBed.createComponent(DetailDesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
