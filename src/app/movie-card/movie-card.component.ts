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
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

//opens genre window
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
getFavorites(): void {
  this.fetchApiData.getUser().subscribe((resp: any) => {
    this.favorites = resp.FavoriteMovies;
    console.log(this.favorites);
    return this.favorites;
  });
}

//checks if movie is in favorites
isFav(id: string): boolean {
  return this.favorites.includes(id);
}

//adds movie to favorites
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

