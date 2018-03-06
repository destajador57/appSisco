import { TestBed, inject } from '@angular/core/testing';

import { DhlServiceService } from './dhl-service.service';

describe('DhlServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DhlServiceService]
    });
  });

  it('should be created', inject([DhlServiceService], (service: DhlServiceService) => {
    expect(service).toBeTruthy();
  }));
});
