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

    _saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}