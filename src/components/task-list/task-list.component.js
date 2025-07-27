import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-task-list',
  template: `
    <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3" id="taskList">
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
           (dragend)="dragEnd($event)"
           (touchstart)="touchStart($event, i)"
           (touchmove)="touchMove($event, i)"
           (touchend)="touchEnd($event, i)">
        
        <!-- Priority Tag -->
        <div class="priority-tag mb-2" [class]="'priority-' + (task.priority || 'medium')">
          {{ getPriorityLabel(task.priority) }}
        </div>
        
        <h3 class="font-bold text-blue-400 text-sm sm:text-base">{{ task.title }}</h3>
        <p class="text-gray-400 mt-2 text-xs sm:text-sm">{{ task.description || 'No description' }}</p>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
          <span class="text-xs sm:text-sm font-mono" 
                [class.text-green-400]="task.completed" 
                [class.text-yellow-400]="!task.completed">
            {{ task.completed ? '✓ Completed' : '◉ Pending' }}
          </span>
          <span class="text-xs sm:text-sm text-blue-400 font-mono">
            {{ task.assignedUser?.name || 'Unassigned' }}
          </span>
        </div>
        <a [routerLink]="['/tasks', task.id, 'edit']" 
           class="text-blue-400 text-xs sm:text-sm mt-2 inline-block hover:text-blue-300">
          Edit
        </a>
      </div>
    </div>
  `,
  styles: [`
    .task-item.dragging, .task-item.touch-dragging {
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
    .priority-tag {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: bold;
      line-height: 1;
    }
    .priority-high {
      background-color: #dc2626;
      color: white;
    }
    .priority-medium {
      background-color: #eab308;
      color: #1f2937;
    }
    .priority-low {
      background-color: #22c55e;
      color: white;
    }
    .priority-none {
      background-color: #4b5563;
      color: #d1d5db;
    }
  `]
})
export class TaskListComponent {
  @Input() tasks = [];
  draggedItemIndex = null;
  dropPosition = null;
  touchStartY = null;
  touchTargetIndex = null;

  getPriorityLabel(priority) {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'None';
    }
  }

  // Desktop Drag and Drop
  dragStart(event, index) {
    this.draggedItemIndex = index;
    event.dataTransfer.setData('text/plain', index.toString());
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

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
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

  // Mobile Touch Events
  touchStart(event, index) {
    event.preventDefault();
    this.draggedItemIndex = index;
    this.touchStartY = event.touches[0].clientY;
    const target = event.currentTarget;
    target.classList.add('touch-dragging');
  }

  touchMove(event, index) {
    event.preventDefault();
    if (this.draggedItemIndex === null || this.touchStartY === null) return;

    const touchY = event.touches[0].clientY;
    const items = Array.from(document.querySelectorAll('.task-item'));
    const target = items[index];

    if (!target) return;

    items.forEach((item, i) => {
      if (i === this.draggedItemIndex) return;

      const rect = item.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;

      item.classList.remove('drop-target', 'drop-target-above', 'drop-target-below');

      if (touchY >= rect.top && touchY <= rect.bottom) {
        item.classList.add('drop-target');
        this.touchTargetIndex = i;
        this.dropPosition = touchY < midpoint ? 'above' : 'below';
        item.classList.add(`drop-target-${this.dropPosition}`);
      }
    });
  }

  touchEnd(event, index) {
    event.preventDefault();
    if (this.draggedItemIndex !== null && this.touchTargetIndex !== null && this.draggedItemIndex !== this.touchTargetIndex) {
      const itemToMove = this.tasks[this.draggedItemIndex];
      this.tasks.splice(this.draggedItemIndex, 1);

      const adjustedDropIndex = this.dropPosition === 'below' && this.touchTargetIndex > this.draggedItemIndex
        ? this.touchTargetIndex
        : this.touchTargetIndex;

      this.tasks.splice(adjustedDropIndex, 0, itemToMove);
    }

    this.resetDropStyles();
    this.touchStartY = null;
    this.touchTargetIndex = null;
  }

  resetDropStyles() {
    const items = document.querySelectorAll('.task-item');
    items.forEach(item => {
      item.classList.remove(
        'dragging',
        'touch-dragging',
        'drop-target',
        'drop-target-above',
        'drop-target-below'
      );
    });
    this.dropPosition = null;
    this.draggedItemIndex = null;
  }
}