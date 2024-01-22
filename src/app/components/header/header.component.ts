import { Component, HostListener, Input } from '@angular/core';

/// this component represents in app header

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input()
  title!: string;  /// this variable represents the text to be shown in the header
  isFixed = false;

  /// to change the header when scrolling
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isFixed = window.scrollY > 0;
  }
}
