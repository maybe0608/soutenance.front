import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectionPharmacieComponent } from './modal-selection-pharmacie.component';

describe('ModalSelectionPharmacieComponent', () => {
  let component: ModalSelectionPharmacieComponent;
  let fixture: ComponentFixture<ModalSelectionPharmacieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelectionPharmacieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSelectionPharmacieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
