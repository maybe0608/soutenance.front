import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavrightComponent } from './navright.component';

describe('NavrightComponent', () => {
  let component: NavrightComponent;
  let fixture: ComponentFixture<NavrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavrightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
