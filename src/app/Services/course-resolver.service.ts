import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { CoursesServiceService } from './courses-service.service';

@Injectable({
  providedIn: "root",
})
export class CourseResolverService implements Resolve<Course> {
  constructor(private coursesService: CoursesServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    const courseUrl = route.paramMap.get("courseUrl");

    console.log("courseUrl =", courseUrl)

    return this.coursesService.findCourseByUrl(courseUrl)
  }
}
