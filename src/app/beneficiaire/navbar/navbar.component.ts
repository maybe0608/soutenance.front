import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavRightComponent } from './nav-right/nav-right.component';
import { SlidersOutline } from '@ant-design/icons-angular/icons';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NgClass,NavLeftComponent,NavRightComponent,HeaderComponent],
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