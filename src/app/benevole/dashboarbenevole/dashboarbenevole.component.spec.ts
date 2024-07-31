import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarbenevoleComponent } from './dashboarbenevole.component';

describe('DashboarbenevoleComponent', () => {
  let component: DashboarbenevoleComponent;
  let fixture: ComponentFixture<DashboarbenevoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboarbenevoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboarbenevoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
