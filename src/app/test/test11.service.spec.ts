import { TestBed } from '@angular/core/testing';

import { Test11Service } from './test11.service';

describe('Test11Service', () => {
  let service: Test11Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Test11Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
