import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggInComponent } from './logg-in.component';

describe('LoggInComponent', () => {
  let component: LoggInComponent;
  let fixture: ComponentFixture<LoggInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggInComponent]
    });
    fixture = TestBed.createComponent(LoggInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
