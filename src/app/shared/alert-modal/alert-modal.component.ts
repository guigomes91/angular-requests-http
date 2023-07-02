import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { AlertModalService } from '../alert-modal.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {

  @Input() type = 'success';
  @Input() message!: string;

  constructor(public bsModalRef: BsModalRef,
    private alertService: AlertModalService) {}

  onClose() {
    this.bsModalRef.hide();
  }

  showAlertDanger(message: string) {
    this.alertService.showAlertDanger(message);
  }

  showAlertSuccess(message: string) {
    this.alertService.showAlertSuccess(message);
  }
}
