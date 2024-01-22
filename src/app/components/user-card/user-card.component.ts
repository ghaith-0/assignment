import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';


/// this component represents the user list element


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],

  /// add some animations to user card
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserCardComponent {
  @Input() user: any; /// this variable represents the user

  constructor(private router: Router) {}

  /// navigate to details
  navigateToUserDetail(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
}
