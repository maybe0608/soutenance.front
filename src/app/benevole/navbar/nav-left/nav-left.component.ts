import { MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { CommonModule } from '@angular/common';
import { Component,EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconDefinition, IconModule, } from '@ant-design/icons-angular';


@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [CommonModule,RouterModule,IconModule],
  templateUrl: './nav-left.component.html',
  styleUrl: './nav-left.component.css'
})
export class NavLeftComponent {
  @Input() navCollapsed: boolean = true;
  @Output() navCollapsedChange = new EventEmitter<boolean>();

  menuFoldIcon: IconDefinition = MenuFoldOutline;
  menuUnfoldIcon: IconDefinition = MenuUnfoldOutline;

  constructor() {}

  toggleNav() {
    this.navCollapsed = !this.navCollapsed;
    this.navCollapsedChange.emit(this.navCollapsed);
  }}