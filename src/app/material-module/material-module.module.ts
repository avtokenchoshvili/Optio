import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatChipsModule} from '@angular/material/chips';

import { FlexModule } from '@angular/flex-layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '@angular/flex-layout';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatChipsModule,
    FlexLayoutModule,
    FlexModule,
    GridModule,
  ],
  exports: [
    MatPaginatorModule,
    MatProgressBarModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatChipsModule,
    FlexLayoutModule,
    FlexModule,
    GridModule


  ]
})
export class MaterialModuleModule { }
