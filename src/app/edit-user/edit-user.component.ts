import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: any = {};
  @Input() loggedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.loggedUser.Username = this.user.Username;
      this.loggedUser.Email = this.user.Email;
      this.loggedUser.Birthday = this.user.Birthday;
      console.log(this.loggedUser);
      return this.user;
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.loggedUser).subscribe((result) => {
     console.log(result);
    /* if (result.user.Password == undefined) {
      this.snackBar.open('Please enter a password to confirm changes!', 'OK', {
        duration: 2000,
      });
     }*/
     this.dialogRef.close();
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Profile updated, please login again with your new credentials.',
          'OK',
          {
            duration: 2000,
          }
        );
    });
  }

}
