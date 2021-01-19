import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sb-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.css']
})
export class UserProfileFormComponent implements OnInit {
  @Input() user:User;
  public userForm:FormGroup;
  private fb:FormBuilder = new FormBuilder();
  
  constructor(private usersService:UsersService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  	this.userForm = this.fb.group({
  		displayName: new FormControl(this.user.displayName)
  	});
  }

  submit() {
  	let toSave = { id: this.user.id, displayName: this.userForm.value['displayName'] };
  	callWithSnackBar(this.snackBar,	this.usersService.save(toSave), ['Saving user...', 'User saved', 'Error saving user']);
  }

}
