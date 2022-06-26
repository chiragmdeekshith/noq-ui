import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NoQ';

  toggleMenuStatusEvent: any;

  constructor(){ }

  public handleMenuToggleStatus(toggleMenuStatusEvent: Event){
    this.toggleMenuStatusEvent = toggleMenuStatusEvent;
  }


}

