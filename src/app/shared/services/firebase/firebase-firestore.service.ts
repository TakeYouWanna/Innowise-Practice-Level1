import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentData,
  DocumentReference
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFirestoreService {
  private CollectionRef: CollectionReference<unknown>;

  constructor(private firebaseFirestore: AngularFirestore) {
    this.CollectionRef = this.firebaseFirestore.collection('Users').ref;
  }

  public addNewTask(
    id: string,
    task: Task
  ): Observable<DocumentReference<DocumentData>> {
    return from(this.CollectionRef.doc(id).collection('Tasks').add(task));
  }

  public getTasks(
    id: string,
    lastDay: Date
  ): Observable<{ [id: string]: Task }> {
    return from(
      this.CollectionRef.doc(id)
        .collection('Tasks')
        .where('date', '<=', lastDay)
        .get()
    ).pipe(
      map((resolve) => {
        const tasks: { [id: string]: Task } = {};
        resolve.forEach((data) => {
          const task = data.data();
          tasks[data.id] = {
            name: task.name,
            description: task.description,
            status: task.status,
            date: task.date.toDate()
          };
        });
        return tasks;
      })
    );
  }

  public updateTask(id: string, taskId: string, task: Task): Observable<void> {
    return from(
      this.CollectionRef.doc(id).collection('Tasks').doc(taskId).update(task)
    );
  }

  public deleteTask(id: string, taskId: string): Observable<void> {
    return from(
      this.CollectionRef.doc(id).collection('Tasks').doc(taskId).delete()
    );
  }
}
