import { TestBed, inject } from '@angular/core/testing';

import { PermissaoService } from './permissao.service';

describe('PermissaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissaoService]
    });
  });

  it('should be created', inject([PermissaoService], (service: PermissaoService) => {
    expect(service).toBeTruthy();
  }));
});
