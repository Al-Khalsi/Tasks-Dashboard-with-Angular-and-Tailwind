export class TaskService {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.users = [];
  }

  _saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}