import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit(): void {}

  /**
   * @function toMovies
   * @purpose Navigates to the movie list page.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @function toProfile
   * @purpose Navigates to the current user profile page.
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @function logout
   * @purpose logs the current user out, navigates to the welcome screen, & clears token/username from local storage.
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}