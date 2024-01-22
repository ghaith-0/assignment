import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user_data_service/user-data.service';
import { Subscription } from 'rxjs';
import { CacheService } from '../../services/cache_service/cache.service';
import { Router } from '@angular/router';

/// this component represents the users list


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: any[] = []; /// all users
  currentPage = 1; /// the user selected page
  totalPages = 1; /// all pages from server
  perPageOptions = [3, 6, 9, 12, 15]; /// num of users per page
  perPage = 3; /// the user selected num of users per page
  loading = false; /// variable to track loading state

  searchTerm: string = '';
  searchResults: any[] = [];
  private userSubscription: Subscription | undefined;

  constructor(private userService: UserDataService,private cacheService:CacheService,
    private router: Router) {}

  ngOnInit(): void {;
    this.loadUsers();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  /// to avoid memory leak
  loadUsers() {
    this.loading = true; /// set loading to true when starting API request

    const cacheKeyPerPage = `per_page`; /// build the cache key for getting cached per page
    const perPage = this.cacheService.get(cacheKeyPerPage);  /// get data from cache

    if(perPage){
      this.perPage= perPage;
    }

    const cacheKeyCurrentPage = `current_page`; /// build the cache key for getting current page
    const currentPage = this.cacheService.get(cacheKeyCurrentPage);  /// get data from cache

    if(currentPage){
      this.currentPage= currentPage;
    }

    const cacheKey = `users_${this.currentPage}_${this.perPage}`; /// build the cache key
    const cachedData = this.cacheService.get(cacheKey);  /// get data from cache
    /// data found in cache
    if (cachedData) {
      this.users = cachedData.data;
      this.totalPages = cachedData.total_pages;
      this.loading = false;  /// set loading to false in case of an error
    }

    /// no data found in cache
    else {
    this.userSubscription = this.userService.getUsers(this.currentPage, this.perPage).subscribe(
      (data: any) => {
        this.users = data.data;
        this.totalPages = data.total_pages;
        this.cacheService.set(cacheKey, data); /// save data to cache
        this.loading = false;  /// set loading to false in case of an error
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false; /// set loading to false in case of an error
      }
    );
    }
  }

  /// when the user change the page
  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      const cacheKey = 'current_page'; /// build the cache key
      this.cacheService.set(cacheKey, this.currentPage); /// save data to cache
      this.loadUsers();
    }
  }

  /// when change the num of elements per page
  onPerPageChange() {
    this.currentPage=1;
    const cacheKeyCurrentPage = 'current_page'; /// build the cache key
    this.cacheService.set(cacheKeyCurrentPage, this.currentPage); /// save data to cache
    const cacheKey = 'per_page'; /// build the cache key
    this.cacheService.set(cacheKey, this.perPage); /// save data to cache
    this.loadUsers();
  }

  /// when user search
  searchUsers() {
    if (this.searchTerm.trim() !== '') {
      this.searchResults = [];
      const cacheKey = 'search'; /// build the cache key
      const cachedData = this.cacheService.get(cacheKey);  /// get data from cache

      /// data found in cache
      if (cachedData) {
        cachedData.data.forEach((element: any) => {
          if(element.id.toString().includes(Number(this.searchTerm))){
            this.searchResults.push(element);
          }
        });;
      }

      /// no data found in cache
      else {
        this.loading = true;
        this.userSubscription = this.userService.searchUsers().subscribe(
          (data: any) => {
            /// filter the result as needed
            data.data.forEach((element: any) => {
              if(element.id.toString().includes(Number(this.searchTerm))){
                this.searchResults.push(element);
              }
            });
            this.cacheService.set(cacheKey, data); /// save data to cache
            this.loading = false;
          },
          (error) => {
            console.error('Error searching users:', error);
            this.loading = false;
          }
        );
      }
    } else {
      this.searchResults = [];
    }
  }

  /// navigate to details
  navigateToUserDetail(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
}
