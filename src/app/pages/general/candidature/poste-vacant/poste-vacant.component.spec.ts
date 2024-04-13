import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteVacantComponent } from './poste-vacant.component';

describe('PosteVacantComponent', () => {
  let component: PosteVacantComponent;
  let fixture: ComponentFixture<PosteVacantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosteVacantComponent]
    });
    fixture = TestBed.createComponent(PosteVacantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
