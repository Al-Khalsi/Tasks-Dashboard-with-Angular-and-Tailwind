import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-task-filter',
  template: `
    <div class="flex gap-4 mb-6">
      <select 
        class="p-2 border rounded"
        [(ngModel)]="filters.status"
        (change)="applyFilters()">
        <option value="">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      
      <input
        type="text"
        class="p-2 border rounded flex-grow"
        placeholder="Search tasks..."
        [(ngModel)]="filters.searchTerm"
        (input)="applyFilters()">
    </div>
  `
})
export class TaskFilterComponent {
  filters = {
    status: '',
    searchTerm: ''
  };

  @Output() filterChange = new EventEmitter();

  applyFilters() {
    this.filterChange.emit({ ...this.filters });
  }
}