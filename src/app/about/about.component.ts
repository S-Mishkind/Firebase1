import { Component, OnInit } from "@angular/core";

import "firebase/firestore";

import { AngularFirestore } from "@angular/fire/firestore";
import { COURSES, findLessonsForCourse } from "./db-data";
import { Capabilities } from "selenium-webdriver";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent {
  constructor(private db: AngularFirestore) {}

  async uploadData() {
    const coursesCollection = this.db.collection("courses");
    const courses = await this.db.collection("courses").get();
    for (let course of Object.values(COURSES)) {
      const newCourse = this.removeId(course);
      const courseRef = await coursesCollection.add(newCourse);
      const lessons = await courseRef.collection("lessons");
      const courseLessons = findLessonsForCourse(course["id"]);
      console.log(`Uploading course ${course["description"]}`);
      for (const lesson of courseLessons) {
        const newLesson = this.removeId(lesson);
        delete newLesson.courseId;
        await lessons.add(newLesson);
      }
    }
  }

  removeId(data: any) {
    const newData: any = { ...data };
    delete newData.id;
    return newData;
  }

  onReadDoc() {
    this.db
      .doc("/courses/0ODSID5p1R1ta5B4vpwI")
      /* get works like a typical db -- doesn't detect changes */
      /*  .get() */
      /* snapshot changes detect remote changes in db 
      ** valueChanges works similarly to snapshot changes -- data is returned in a slightly different manner 
      ** see Firestore Fundamentals - Realtime Capabilities for example 
      * */
      .snapshotChanges()
      .subscribe((snap) => {
        /*  use with get */
        /*  console.log(snap.id);
        console.log(snap.data()); */
        /* use with snapshot -- add payload */
        console.log(snap.payload.id);
        console.log(snap.payload.data());
      });
  }

  onReadCollection() {
    this.db

      /* query all courses */
      // .collection("courses")
      /*  query lessons in a specific course */
      /*  .collection("/courses/0ODSID5p1R1ta5B4vpwI/lessons") */
      /*  .collection("/courses/0ODSID5p1R1ta5B4vpwI/lessons", */
      /*   where seqNo == value less than 5 */
      /* ref => ref.where("seqNo", "<=" , 5).orderBy("seqNo")  )  */
      .collection("courses", (ref) =>
        ref
          .where("seqNo", "<=", 20)
          .where("url", "==", "angular-forms-course")
          .orderBy("seqNo")
      )
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          console.log(snap.id);
          console.log(snap.data());
        });
      });
  }

  onReadCollectionGroup() {
    this.db
      .collectionGroup("lessons", (ref) => ref.where("seqNo", "==", 1))
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          console.log(snap.id);
          console.log(snap.data());
        });
      });
  }
}
