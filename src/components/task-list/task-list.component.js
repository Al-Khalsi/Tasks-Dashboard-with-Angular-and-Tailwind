import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-task-list',
  template: `
    <div class="grid gap-4" id="taskList">
      <div *ngFor="let task of tasks; let i = index" 
           class="task-item p-4 border border-gray-700 rounded bg-gray-800 shadow-lg
                  hover:border-blue-400 transition-all duration-200 cursor-grab
                  active:cursor-grabbing"
           draggable="true"
           (dragstart)="dragStart($event, i)"
           (dragover)="dragOver($event, i)"
           (dragenter)="dragEnter($event)"
           (dragleave)="dragLeave($event)"
           (drop)="drop($event, i)"
           (dragend)="dragEnd($event)">
        <h3 class="font-bold text-blue-400">{{ task.title }}</h3>
        <p class="text-gray-400 mt-2">{{ task.description || 'No description' }}</p>
        <div class="flex justify-between items-center mt-3">
          <span class="text-sm font-mono" 
                [class.text-green-400]="task.completed" 
                [class.text-yellow-400]="!task.completed">
            {{ task.completed ? '✓ Completed' : '◉ Pending' }}
          </span>
          <span class="text-sm text-blue-400 font-mono">
            {{ task.assignedUser?.name || 'Unassigned' }}
          </span>
        </div>
        <a [routerLink]="['/tasks', task.id, 'edit']" 
           class="text-blue-400 text-sm mt-2 inline-block hover:text-blue-300">
          Edit
        </a>
      </div>
    </div>
  `,
  styles: [`
    .task-item.dragging {
      opacity: 0.7;
      transform: scale(1.02);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
      border: 2px solid #4299e1 !important;
      cursor: grabbing;
    }
    .task-item.drop-target {
      background-color: rgba(66, 153, 225, 0.1);
    }
    .task-item.drop-target-above {
      border-top: 3px solid #4299e1;
      margin-top: 12px;
      padding-top: 16px;
    }
    .task-item.drop-target-below {
      border-bottom: 3px solid #4299e1;
      margin-bottom: 12px;
      padding-bottom: 16px;
    }
  `]
})
export class TaskListComponent {
  @Input() tasks = [];
  draggedItemIndex = null;
  dropPosition = null;

  dragStart(event, index) {
    this.draggedItemIndex = index;
    event.dataTransfer.setData('text/plain', index);
    event.currentTarget.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(new Image(), 0, 0);
  }

  dragOver(event, index) {
    event.preventDefault();
    if (index === this.draggedItemIndex) return;
    
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    
    target.classList.remove('drop-target-above', 'drop-target-below', 'drop-target');
    
    if (event.clientY < midpoint) {
      target.classList.add('drop-target-above');
      this.dropPosition = 'above';
    } else {
      target.classList.add('drop-target-below');
      this.dropPosition = 'below';
    }
    
    target.classList.add('drop-target');
  }

  dragEnter(event) {
    event.preventDefault();
  }

  dragLeave(event) {
    event.currentTarget.classList.remove('drop-target', 'drop-target-above', 'drop-target-below');
  }

  drop(event, dropIndex) {
    event.preventDefault();
    const draggedIndex = this.draggedItemIndex;
    
    if (draggedIndex !== dropIndex) {
      const itemToMove = this.tasks[draggedIndex];
      this.tasks.splice(draggedIndex, 1);
      
      const adjustedDropIndex = this.dropPosition === 'below' && dropIndex > draggedIndex 
        ? dropIndex 
        : dropIndex;
      
      this.tasks.splice(adjustedDropIndex, 0, itemToMove);
    }
    
    this.resetDropStyles();
  }

  dragEnd(event) {
    this.resetDropStyles();
  }

  resetDropStyles() {
    const items = document.querySelectorAll('.task-item');
    items.forEach(item => {
      item.classList.remove(
        'dragging', 
        'drop-target', 
        'drop-target-above', 
        'drop-target-below'
      );
    });
    this.dropPosition = null;
  }
}