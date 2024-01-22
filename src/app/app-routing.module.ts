import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';

/// paths
const usersList ='users-list';
const userDetails ='user-details/:id';


const routes: Routes = [
  /// paginated users page
  { path: usersList, component: UserListComponent },
  /// redirect to user-list on main url
  {
    path: '',
    redirectTo: usersList,
    pathMatch: 'full'
  },
  /// user details page
  { path: userDetails, component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
