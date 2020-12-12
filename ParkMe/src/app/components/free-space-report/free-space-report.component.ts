import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FreeSpaceReportingService } from 'src/app/services/free-space-reporting.service';

@Component({
  selector: 'app-free-space-report',
  templateUrl: './free-space-report.component.html',
  styleUrls: ['./free-space-report.component.css']
})
export class FreeSpaceReportComponent implements OnInit {

  constructor(readonly freeSpaceReportingService: FreeSpaceReportingService) { }

  ngOnInit(): void {
  }

  submitFreeSpaceReport(form: NgForm) {
    console.log(form.value);
    this.freeSpaceReportingService.reportFreeSpace();
  }

}
