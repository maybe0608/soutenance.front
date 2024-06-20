import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenevoleComponent } from './benevole.component';

describe('BenevoleComponent', () => {
  let component: BenevoleComponent;
  let fixture: ComponentFixture<BenevoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenevoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenevoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
