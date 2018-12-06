import { TestBed, inject } from '@angular/core/testing';

import { BusinessResolverService } from './business-resolver.service';

describe('BusinessResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessResolverService]
    });
  });

  it('should be created', inject([BusinessResolverService], (service: BusinessResolverService) => {
    expect(service).toBeTruthy();
  }));
});
