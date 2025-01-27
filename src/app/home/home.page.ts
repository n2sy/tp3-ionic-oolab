import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ManageTasksService } from '../manage-tasks.service';
import { provideHttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  currentDate: Date;
  tabTasks = [];
  showAddButton = true;

  constructor(
    private taskService: ManageTasksService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.currentDate = new Date();
    this.chargerTousLesTasks();
  }

  updateTask(idTask, checkedValue) {
    this.taskService.updateTask(idTask, checkedValue).subscribe({
      next: (response) => {
        console.log(response);
        let i = this.tabTasks.findIndex((task) => task.id == idTask);
        this.tabTasks[i].checked = response['checked'];
      },
    });
  }

  addHandler(textValue) {
    this.taskService.addTask(textValue).subscribe({
      next: (response) => {
        console.log(response);
        this.taskService.getTaskById(response['name']).subscribe({
          next: (data) => {
            this.tabTasks.push({
              ...data,
              id: response['name'],
            });
          },
        });
        this.toggleShowAddButton();
      },
    });
  }

  chargerTousLesTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        console.log(data);
        this.tabTasks = [];
        for (const key in data) {
          this.tabTasks.push({
            id: key,
            ...data[key],
          });
        }
        console.log(this.tabTasks);
      },
    });
  }

  async deleteHandler(taskId) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Etes vous sûr ?',
      buttons: [
        'Non',
        {
          text: 'Oui',
          handler: () => {
            this.taskService.deleteTask(taskId).subscribe({
              next: (response) => {
                console.log(response);
                this.chargerTousLesTasks();
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  toggleShowAddButton() {
    this.showAddButton = !this.showAddButton;
  }
}
