import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://brett-flix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // Making the api call for the user registration endpoint
 /**
  * @function userRegistration
  * @purpose POSTs to the API endpoint for registering a new user.
  * @param userDetails 
  * @returns A new user object.
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the login endpoint
  /**
   * @function userLogin
   * @purpose POSTs to the API endpoint for logging in a user.
   * @param userDetails 
   * @returns An user object.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  //get all movies
   /**
   * @function getAllMovies
   * @purpose GET to the API endpoint to get all movies.
   * @returns An array of all movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get one movie
   /**
   * @function getMovie
   * @purpose GET to the API endpoint to get specific movie by title.
   * @param Title
   * @returns A movie object.
   */
  public getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${Title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get director
  /**
   * @function getDirector
   * @purpose GET to the API endpoint to get a specific director's information.
   * @param directorName
   * @returns A director object.
   */
  public getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/director/${directorName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get genre
  /**
   * @function getGenre
   * @purpose GET to the API endpoint to get a specific genre's information.
   * @param genreName 
   * @returns A genre object.
   */
  public getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genre/${genreName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get user
  /**
   * @function getUser
   * @purpose GET to the API endpoint for a specific user.
   * @returns A user object.
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get favorite movies
  /**
   * @function getFavorite
   * @purpose GET to the API endpoint for specific user's favorite movies.
   * @returns A user's favorite movies array.
   */
  public getFavorite(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //add to favorite movies
  /**
   * @function addFavorite
   * @purpose POST to the API endpoint for a specific user's favorite movies, adding a new one.
   * @param movieID 
   * @returns An update user object.
   */
  public addFavorite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, 
    { FavoriteMovie: movieID }, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //edit user 
  /**
   * @function editUser
   * @purpose PUT to the API endpoint of a specific user to update user information.
   * @param loggedUser 
   * @returns An updated user object.
   */
editUser(loggedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, loggedUser, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //delete user
  /**
   * @function deleteUser
   * @purpose DELETE to the API endpoint to delete a specific user.
   * @returns Message of successful deletion
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //delete from favorite movies
  /**
   * @function deleteFavorite
   * @purpose DELETE to the API endpoint for a specific user's favorite movies, removing one.
   * @param movieID 
   * @returns An updated user object.
   */
  public deleteFavorite(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`,
     {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Non-typed response extraction
/**
 * @purpose Extracts response data from HTTP.
 * @param res 
 * @returns Response body or empty object.
 */
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * @purpose Error handler.
   * @param error 
   * @returns Error message.
   */
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened!! Please try again later!!');
  }
}