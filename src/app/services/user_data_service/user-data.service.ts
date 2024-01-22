import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CacheService } from '../cache_service/cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  /// the base url to get data from
  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  // Fetch user card data for pagination
  getUsers(page: number, perPage: number): Observable<any> {
    const cacheKey = `users_${page}_${perPage}`;
    const cachedData = this.cacheService.get(cacheKey);

    /// check if the data exists in cache
    if (cachedData) {
      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    }

    /// perform the api call and return data
    const url = `${this.baseUrl}?page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }

  // Fetch details for a single user
  getUserDetails(id: number): Observable<any> {
    const cacheKey = `user_${id}`;
    const cachedData = this.cacheService.get(cacheKey);

    /// check if the data exists in cache
    if (cachedData) {
      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    }

    /// perform the api call and return data
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }


  // search users
  searchUsers(): Observable<any> {
    const cacheKey = `search`;
    const cachedData = this.cacheService.get(cacheKey);

    /// check if the data exists in cache
    if (cachedData) {
      return new Observable((observer) => {
        observer.next(cachedData);
        observer.complete();
      });
    }

    /// perform the api call and return data
    const url = `${this.baseUrl}?page=${1}&per_page=${1000}`;
    return this.http.get(url);
  }
}
