import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdemandeComponent } from './formdemande.component';

describe('FormdemandeComponent', () => {
  let component: FormdemandeComponent;
  let fixture: ComponentFixture<FormdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormdemandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
