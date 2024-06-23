import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePersonnelleComponent } from './page-personnelle.component';

describe('PagePersonnelleComponent', () => {
  let component: PagePersonnelleComponent;
  let fixture: ComponentFixture<PagePersonnelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePersonnelleComponent]
    });
    fixture = TestBed.createComponent(PagePersonnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
