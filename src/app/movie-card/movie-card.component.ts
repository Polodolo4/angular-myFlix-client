import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] =[];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavorites();
}

//gets all movies
/**
 * @function getMovies
 * @purpose Gets all movies from API and sets the movies state to the response.
 * @returns Array of all movies.
 */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

//opens genre window
/**
 * @function openGenre
 * @purpose Opens the movie genre info dialog.
 * @param name 
 * @param description 
 */
openGenre(name: string, description: string): void {
  this.dialog.open(GenreComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '450px',
  });
}

//opens director window
/**
 * @function openDirector
 * @purpose Opens the movie director info dialog.
 * @param name 
 * @param bio 
 */
openDirector(name: string, bio: string): void {
  this.dialog.open(DirectorComponent, {
    data: {
      Name: name,
      Bio: bio,
    },
    width: '450px',
  });
}

//opens movie summary window
/**
 * @function openDescription
 * @purpose Opens the movie summary dialog.
 * @param title 
 * @param description 
 */
openDescription(title: string, description: string): void {
  this.dialog.open(DescriptionComponent, {
    data: {
      Title: title,
      Description: description,
    },
    width: '450px',
  });
}

//gets favorite movies for user
/**
 * @function getFavorites
 * @purpose Gets favorite movies for user from API and sets the favorites state to the response.
 * @returns Array of users favorite movies.
 */
getFavorites(): void {
  this.fetchApiData.getUser().subscribe((resp: any) => {
    this.favorites = resp.FavoriteMovies;
    console.log(this.favorites);
    return this.favorites;
  });
}

//checks if movie is in favorites
/**
 * @function isFav
 * @purpose Checks if a movie is in a user's favorites.
 * @param id 
 * @returns boolean (True if it is, False if it is not).
 */
isFav(id: string): boolean {
  return this.favorites.includes(id);
}

//adds movie to favorites
/**
 * @function addFavorite
 * @purpose Adds a movie to a user's favorites if not already in favorites.
 * @param id 
 */
addFavorite(id: string): void {
  console.log(id);
  this.fetchApiData.addFavorite(id).subscribe((result) => {
    console.log(result);
    this.snackBar.open('Movie has been added to your favorites!', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
}

/**
 * @function deleteFavorite
 * @purpose Removes a movie from user's favorites (if movie is currently in favorites).
 * @param id 
 */
deleteFavorite(id: string): void {
  console.log(id);
  this.fetchApiData.deleteFavorite(id).subscribe((result) => {
    console.log(result);
    this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
}

}

