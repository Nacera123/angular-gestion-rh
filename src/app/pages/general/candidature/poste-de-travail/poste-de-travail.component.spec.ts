import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteDeTravailComponent } from './poste-de-travail.component';

describe('PosteDeTravailComponent', () => {
  let component: PosteDeTravailComponent;
  let fixture: ComponentFixture<PosteDeTravailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosteDeTravailComponent]
    });
    fixture = TestBed.createComponent(PosteDeTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
