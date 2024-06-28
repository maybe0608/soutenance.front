import { CommonModule } from '@angular/common';
import { Component ,EventEmitter,Input,Output} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconModule, IconDefinition } from '@ant-design/icons-angular';
import { MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-navleft',
  standalone: true,
  imports: [CommonModule,RouterOutlet,IconModule],
  templateUrl: './navleft.component.html',
  styleUrl: './navleft.component.css'
})
export class NavleftComponent {
  @Input() navCollapsed: boolean = true;
  @Output() navCollapsedChange = new EventEmitter<boolean>();

  menuFoldIcon: IconDefinition = MenuFoldOutline;
  menuUnfoldIcon: IconDefinition = MenuUnfoldOutline;

  constructor() {}

  toggleNav() {
    this.navCollapsed = !this.navCollapsed;
    this.navCollapsedChange.emit(this.navCollapsed);
  }}