import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FreeSpaceReportingService {

  constructor() { }

  reportFreeSpace(): void {
    alert('Reportado!')
  }
}
