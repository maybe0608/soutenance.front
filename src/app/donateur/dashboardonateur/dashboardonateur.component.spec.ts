import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardonateurComponent } from './dashboardonateur.component';

describe('DashboardonateurComponent', () => {
  let component: DashboardonateurComponent;
  let fixture: ComponentFixture<DashboardonateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardonateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardonateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
