import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMerchComponent } from './detalle-merch.component';

describe('DetalleMerchComponent', () => {
  let component: DetalleMerchComponent;
  let fixture: ComponentFixture<DetalleMerchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleMerchComponent]
    });
    fixture = TestBed.createComponent(DetalleMerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
