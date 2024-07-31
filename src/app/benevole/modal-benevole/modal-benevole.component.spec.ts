import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBenevoleComponent } from './modal-benevole.component';

describe('ModalBenevoleComponent', () => {
  let component: ModalBenevoleComponent;
  let fixture: ComponentFixture<ModalBenevoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBenevoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBenevoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
