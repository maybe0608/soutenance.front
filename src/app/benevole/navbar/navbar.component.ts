import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavRightComponent } from './nav-right/nav-right.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavLeftComponent,NavRightComponent,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navCollapsed: boolean = true;
  styleSelectorToggle: boolean = false;

  constructor() { }

  toggleNav() {
    this.navCollapsed = !this.navCollapsed;
  }

  toggleStyleSelector() {
    this.styleSelectorToggle = !this.styleSelectorToggle;
  }
}