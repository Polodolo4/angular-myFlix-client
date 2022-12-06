import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'

import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * @function getUser
   * @purpose Gets user information from backend via API call.
   * @returns User object.
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }

  /**
   * @function openEditUser
   * @purpose Opens the dialog to edit profile/account information.
   */
  openEditUser(): void { 
    this.dialog.open(EditUserComponent, {
      width: '450px', 
    });
  }

  /**
   * @function deleteAccount
   * @purpose Deletes account and redirects to the welcome screen upon the confirmation of action.
   */
  deleteAccount(): void {
    if (confirm('Are you sure you want to permanently delete this account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account has successfully been deleted!', 'OK', {
            duration: 2000,
          });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
