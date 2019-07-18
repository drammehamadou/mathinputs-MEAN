import { TestBed } from '@angular/core/testing';

import { ParagraphTreeService } from './paragraph-tree.service';

describe('ParagraphTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParagraphTreeService = TestBed.get(ParagraphTreeService);
    expect(service).toBeTruthy();
  });
});
