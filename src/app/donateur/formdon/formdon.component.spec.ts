import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdonComponent } from './formdon.component';

describe('FormdonComponent', () => {
  let component: FormdonComponent;
  let fixture: ComponentFixture<FormdonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormdonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormdonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
