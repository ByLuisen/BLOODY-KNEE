import { TestBed } from '@angular/core/testing';

import { ProfileMenuServiceService } from './profile-menu-service.service';

describe('ProfileMenuServiceService', () => {
  let service: ProfileMenuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileMenuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
