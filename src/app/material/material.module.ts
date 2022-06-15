import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const MaterialComponents = [
  MatInputModule,
  MatFormFieldModule,
  MatCardModule, 
  MatSelectModule, 
  MatButtonModule
];

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
  })
export class MaterialModule { }
