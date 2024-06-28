import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavleftComponent } from './navleft/navleft.component';
import { NavrightComponent } from './navright/navright.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavleftComponent,NavrightComponent],
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