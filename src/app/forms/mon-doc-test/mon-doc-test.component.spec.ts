import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonDocTestComponent } from './mon-doc-test.component';

describe('MonDocTestComponent', () => {
  let component: MonDocTestComponent;
  let fixture: ComponentFixture<MonDocTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonDocTestComponent]
    });
    fixture = TestBed.createComponent(MonDocTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
