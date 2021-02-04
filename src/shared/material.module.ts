// Other Material imports here
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

 
const MATERIALMODULES = [MatTableModule, MatCardModule, MatExpansionModule, MatIconModule, 
						 MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule,
						 MatTooltipModule, MatGridListModule, MatSelectModule, ScrollingModule,
						 MatSnackBarModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule,
						 MatTabsModule, MatAutocompleteModule, MatCheckboxModule, MatSlideToggleModule,
						 MatDatepickerModule, MatNativeDateModule];

@NgModule({
     imports: [...MATERIALMODULES],
     declarations: [],
     exports: [...MATERIALMODULES]
})
export class MaterialModule {}