import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/AppService.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  clientId: string = '';
  clientSecret: string = '';
  wrongCredentials: boolean = false;
  authentication: boolean = false;

  constructor(private appService: AppService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.checkCredentialsAvailability();
  }

  public saveCredentials() {
    if (this.clientId != '' && this.clientSecret != '') {
      this.appService.saveCredentials(this.clientId, this.clientSecret);
      this.authentication = true;
      this.cdr.detectChanges();
    }
    else {
      this.wrongCredentials = true;
    }
  }

  private checkCredentialsAvailability() {
    if (this.appService.checkCredentialsAvailability()) {
      this.authentication = true;
      this.cdr.detectChanges();
    }
  }

}
