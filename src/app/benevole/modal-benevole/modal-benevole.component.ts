import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-benevole',
  standalone: true,
  imports: [],
  templateUrl: './modal-benevole.component.html',
  styleUrl: './modal-benevole.component.css'
})
export class ModalBenevoleComponent {
  constructor(public activeModal: NgbActiveModal) {}

  proceed(): void {
    this.activeModal.close(true);
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
