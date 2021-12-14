import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { from, observable, Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { Course } from "../model/course";
import { convertSnaps } from "./db-utils.service";

@Injectable({
  providedIn: "root",
})
export class CoursesServiceService {
  constructor(private db: AngularFirestore) {}

  deleteCourse(courseId: string){
    /* from converts promise to observable */
    return from(this.db.doc(`courses/${courseId}`).delete())

  }

  updateCourse(courseId: string, changes: Partial<Course>): Observable<any>{

   return from(this.db.doc(`courses/${courseId}`).update(changes));

  }

  createCourse(newCourse: Partial<Course>, courseId?: string) {
    return this.db
      .collection("courses", (ref) => ref.orderBy("seqNo", "desc").limit(1))
      .get()
      .pipe(
        concatMap((result) => {
          const courses = convertSnaps<Course>(result);

          const lastCourseSeqNo = courses[0]?.seqNo ?? 0;

          const course = {
            ...newCourse,
            seqNo: lastCourseSeqNo + 1,
          };

          let save$: Observable<any>;

          if (courseId) {
            /*   id exists */
            save$ = from(this.db.doc(`courses/${courseId}`).set(course));
          } else {
            /* id does not exist */
            save$ = from(this.db.collection("courses").add(course));
          }

          return save$.pipe(
            map((res) => {
              return {
                id: courseId ?? res.id,
                ...course,
              };
            })
          );
        })
      );
  }

  loadCoursesByCategory(category: string): Observable<Course[]> {
    return this.db
      .collection("courses", (ref) =>
        ref.where("categories", "array-contains", category).orderBy("seqNo")
      )
      .get()
      .pipe(map((result) => convertSnaps<Course>(result)));
  }
}
