import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from './services/user_data_service/user-data.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MatButtonModule } from '@angular/material/button';import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponent,
    UserCardComponent,
    UserDetailComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,FormsModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
