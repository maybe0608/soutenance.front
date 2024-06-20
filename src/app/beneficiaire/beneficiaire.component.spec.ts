import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaireComponent } from './beneficiaire.component';

describe('BeneficiaireComponent', () => {
  let component: BeneficiaireComponent;
  let fixture: ComponentFixture<BeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
