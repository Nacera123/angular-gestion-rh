import { TestBed } from '@angular/core/testing';

import { EtatCandidatureService } from './etat-candidature.service';

describe('EtatCandidatureService', () => {
  let service: EtatCandidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatCandidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
