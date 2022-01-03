import { TestBed } from '@angular/core/testing';

import { DrugAllergyService } from './drug-allergy.service';

describe('DrugAllergyService', () => {
  let service: DrugAllergyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugAllergyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
