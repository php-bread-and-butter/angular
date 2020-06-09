import { TestBed } from '@angular/core/testing';

import { ArchiveDetailsService } from './archive-details.service';

describe('ArchiveDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchiveDetailsService = TestBed.get(ArchiveDetailsService);
    expect(service).toBeTruthy();
  });
});
