import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/AppService.service';
import { CLIENT_ID, CLIENT_SECRET, TOKEN } from './utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.checkAvailability();
  }

  public checkAvailability() {
    if (this.appService.checkCredentialsAvailability()) {
      
      if (this.appService.checkIfTokenIsUnavailable()) {
        this.appService.getToken().subscribe(token => {
          localStorage.setItem(TOKEN, token.access_token);
        });
      }
    }
    else {
      this.router.navigate(['/settings']);
    }
  }

}
