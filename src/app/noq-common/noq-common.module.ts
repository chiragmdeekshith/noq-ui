import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MaterialModule } from '../material/material.module';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavigationBarComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PageNotFoundComponent,
    NavigationBarComponent,
    TopBarComponent
  ]
})
export class NoQCommonModule { }
