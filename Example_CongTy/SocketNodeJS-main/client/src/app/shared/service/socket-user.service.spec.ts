import { TestBed } from '@angular/core/testing';

import { SocketUserService } from './socket-user.service';

describe('SocketUserService', () => {
  let service: SocketUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
