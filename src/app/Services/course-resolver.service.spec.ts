import { TestBed } from '@angular/core/testing';

import { CourseResolverService } from './course-resolver.service';

describe('CourseResolverService', () => {
  let service: CourseResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
