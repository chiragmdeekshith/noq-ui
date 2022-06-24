import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NoQ';

  toggleStatusEvent:any;
  userLoggedIn!: boolean;

  constructor(){
  }

  public handleToggleStatus(toggleStatusEvent: Event){
    this.toggleStatusEvent = toggleStatusEvent;
  }
}

