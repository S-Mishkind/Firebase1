import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService {

  constructor(private db: AngularFirestore) { 

  }

  loadCoursesByCategory(category: string): Observable<Course[]> {
this.db.collection(
  "courses", 
  ref => ref.where("categories", "array-contains", category)
  .orderBy("seqNo")
  )
  .get()
  }
}
