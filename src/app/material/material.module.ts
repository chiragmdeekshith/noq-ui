import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';

const MaterialComponents = [
  MatInputModule,
  MatFormFieldModule,
  MatCardModule, 
  MatSelectModule, 
  MatButtonModule,
  MatGridListModule,
  MatToolbarModule,
  MatTableModule,
  CdkAccordionModule
];

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
  })
export class MaterialModule { }
