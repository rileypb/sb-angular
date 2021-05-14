import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';

@Component({
  selector: 'sb-edit-settings-dialog',
  templateUrl: './edit-settings-dialog.component.html',
  styleUrls: ['./edit-settings-dialog.component.css']
})
export class EditSettingsDialogComponent implements OnInit {
  @Input() user:any;

  constructor(private themeService:ThemeService, private usersService:UsersService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  changeTheme(newTheme) {
  	this.user.theme = newTheme;
  	this.themeService.setTheme(newTheme);
  	callWithSnackBar(this.snackBar, this.usersService.save({id: this.user.id, theme: newTheme}),
  		["Saving setting...", "Setting saved", "Error saving setting"]);
  }

}
