export class TaskService {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.users = [];
    }

    async fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            this.users = await response.json();
            return this.users;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    getTasks() {
        return [...this.tasks];
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    addTask(task) {
        const newTask = { ...task, id: Date.now().toString() };
        this.tasks.push(newTask);
        this._saveToLocalStorage();
        return newTask;
    }

    updateTask(id, updatedTask) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updatedTask };
            this._saveToLocalStorage();
            return this.tasks[index];
        }
        return null;
    }

    _saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}