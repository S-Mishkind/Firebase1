import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesServiceService } from '../Services/courses-service.service';


@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  course: Course;

  loading = false;

  displayedColumns = ["seqNo", "description", "duration"];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesServiceService) {}

  ngOnInit() {
    this.course = this.route.snapshot.data["course"];
  }
}
