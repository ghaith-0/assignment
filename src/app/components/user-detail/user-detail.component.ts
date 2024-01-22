import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../services/user_data_service/user-data.service';
import { Subscription } from 'rxjs';
import { CacheService } from 'src/app/services/cache_service/cache.service';
import { animate, style, transition, trigger } from '@angular/animations';

/// this component represents the user details element

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  /// add some animations
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserDetailComponent implements OnInit {
  user: any; /// this variable represents the user
  loading = false; /// this variable represents a loading state
  private userSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private router: Router,
     private userService: UserDataService,private cacheService:CacheService) {}


  ngOnInit(): void {
    this.loading = true; /// Set loading to true when starting API request
    const userId = this.route.snapshot.params['id']; /// get the user id from the route params
    const cacheKey = `user_${userId}`; /// build the cache key
    const cachedData = this.cacheService.get(cacheKey); /// get data from cache

    /// data found in cache
    if (cachedData) {
      this.user = cachedData.data;
      this.loading = false;  /// set loading to false when data load
    }

    /// no data found in cache
    else {
    this.userService.getUserDetails(userId).subscribe((data: any) => {
      this.user = data.data;
      this.cacheService.set(cacheKey, data); /// save to cache
      this.loading = false;  /// set loading to false when data load
    },

    (error) => {
      console.error('Error fetching user details', error);
      this.loading = false; /// set loading to false in case of an error
    });
    }
  }

  /// to go back to users list page
  navigateBack() {
    this.router.navigate(['/users-list']);
  }


  /// to avoid memory leak
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

