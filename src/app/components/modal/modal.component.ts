import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() open: Boolean;
  @Output() closeAction: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.closeAction.emit();
  }
}
