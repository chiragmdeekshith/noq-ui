import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app.constant';
import { SharedService } from '../shared.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  toggleMenuStatus!: boolean;
  @Output() public menuStatusEventEmitter!: EventEmitter<any>;
  loginStatusSub!: Subscription;
  loginStatus! : boolean;

  constructor(private router: Router, private sharedService: SharedService) { 
    this.menuStatusEventEmitter = new EventEmitter<boolean>();
    this.toggleMenuStatus = false;
  }

  ngOnInit(): void {
    this.loginStatusSub = this.sharedService.onClickLogin$.subscribe($event => {
      this.loginStatus = $event;
    });
  }

  ngOnDestroy(): void {
    if (this.loginStatusSub) {
      this.loginStatusSub.unsubscribe();
    }
  }

  public onClickLogin() {
    console.log("Navigating to login.");
    this.router.navigate(['/login']);
  }

  public onClickLogout() {
    console.log("Logging out");
    sessionStorage.removeItem(AppConstant.SESSION_STORAGE_USER_EMAIL_ID);
    this.loginStatus = false;
    this.router.navigate(['/home']);
  }

  public onClickLogo() {
    console.log("Navigating home.");
    this.router.navigate(['/home']);
  }

  public toggleToggleMenu() {
    this.toggleMenuStatus = !this.toggleMenuStatus;
    this.menuStatusEventEmitter.emit(this.toggleMenuStatus);
  }

}
