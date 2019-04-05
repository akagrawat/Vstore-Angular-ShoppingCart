import { TestBed } from '@angular/core/testing';

import { TostarService } from './tostar.service';

describe('TostarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TostarService = TestBed.get(TostarService);
    expect(service).toBeTruthy();
  });
});
