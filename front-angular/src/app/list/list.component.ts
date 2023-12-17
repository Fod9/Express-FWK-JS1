import { Component } from '@angular/core';
import {BackendService} from "../backend.service";
import {Qcm,Question} from "../qcm";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [BackendService],
})
export class ListComponent {

  qcms: Array<Qcm>;

  constructor(private backendService: BackendService) {
    this.qcms = [];
    this.backendService.getQcms().then(() => {
      this.qcms = this.backendService.showQcms();
      console.log(this.qcms);
    });
  }

}
