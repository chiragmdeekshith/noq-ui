import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Input()
  toggleMenuStatus!: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public onClickRestaurants() {
    console.log("Navigating to restaurants.");
    this.router.navigate(['/restaurants']);
  }

  public onClickCart() {
    console.log("Navigating to cart.");
    this.router.navigate(['/cart']);
  }

  public onClickOrders() {
    console.log("Navigating to orders.");
    this.router.navigate(['/orders']);
  }
}
