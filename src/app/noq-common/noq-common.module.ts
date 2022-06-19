import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PageNotFoundComponent,
    NavigationBarComponent
  ]
})
export class NoQCommonModule { }
