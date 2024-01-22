import { Component, Input, booleanAttribute } from '@angular/core';


/// this component represents in app loading indicator


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() isLoading!: boolean; /// this variable represents if there is a loading state
}
