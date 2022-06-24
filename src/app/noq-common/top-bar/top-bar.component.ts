import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  toggleMenuStatus!: boolean;
  @Output() public eventEmitter = new EventEmitter<any>();


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.toggleMenuStatus = false;
  }

  public onClickLogin() {
    console.log("Navigating to login.");
    this.router.navigate(['/login']);
  }

  public onClickLogout() {
    console.log("Logging out");
    sessionStorage.removeItem(AppConstant.SESSION_STORAGE_USER_EMAIL_ID);
    this.router.navigate(['/home']);
  }

  public onClickLogo() {
    console.log("Navigating home.");
    this.router.navigate(['/home']);
  }

  public toggleToggleMenu() {
    this.toggleMenuStatus = !this.toggleMenuStatus;
    this.eventEmitter.emit(this.toggleMenuStatus);
  }

}
