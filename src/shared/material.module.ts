// Other Material imports here
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

 
const MATERIALMODULES = [ MatCardModule, MatExpansionModule, MatIconModule, 
						 MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule,
						 MatTooltipModule, MatSelectModule,
						 MatSnackBarModule, MatProgressSpinnerModule,
						 MatAutocompleteModule, MatCheckboxModule,
						 MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatMenuModule,
						 MatBadgeModule];

@NgModule({
     imports: [...MATERIALMODULES],
     declarations: [],
     exports: [...MATERIALMODULES]
})
export class MaterialModule {}