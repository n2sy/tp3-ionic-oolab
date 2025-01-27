import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManageTasksService {
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get('https://ng-tasks-c6b03.firebaseio.com/Tasks.json');
  }

  addTask(text) {
    return this.http.post('https://ng-tasks-c6b03.firebaseio.com/Tasks.json', {
      text: text,
      checked: false,
      date: new Date(),
    });
  }

  deleteTask(taskId) {
    return this.http.delete(
      `https://ng-tasks-c6b03.firebaseio.com/Tasks/${taskId}.json`
    );
  }

  updateTask(idTask, newValueChecked) {
    return this.http.patch(
      `https://ng-tasks-c6b03.firebaseio.com/Tasks/${idTask}.json`,
      {
        checked: newValueChecked,
      }
    );
  }

  getTaskById(taskId) {
    return this.http.get(
      `https://ng-tasks-c6b03.firebaseio.com/Tasks/${taskId}.json`
    );
  }
}
