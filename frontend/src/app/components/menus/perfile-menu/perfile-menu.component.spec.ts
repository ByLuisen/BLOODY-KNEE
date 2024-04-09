import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfileMenuComponent } from './perfile-menu.component';

describe('PerfileMenuComponent', () => {
  let component: PerfileMenuComponent;
  let fixture: ComponentFixture<PerfileMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfileMenuComponent]
    });
    fixture = TestBed.createComponent(PerfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
