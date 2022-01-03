import { TestBed } from '@angular/core/testing';

import { FamiliarDiseaseService } from './familiar-disease.service';

describe('FamiliarDiseaseService', () => {
  let service: FamiliarDiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamiliarDiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
