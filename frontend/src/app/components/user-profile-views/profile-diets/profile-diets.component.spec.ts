import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDietsComponent } from './profile-diets.component';

describe('ProfileDietsComponent', () => {
  let component: ProfileDietsComponent;
  let fixture: ComponentFixture<ProfileDietsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDietsComponent]
    });
    fixture = TestBed.createComponent(ProfileDietsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
