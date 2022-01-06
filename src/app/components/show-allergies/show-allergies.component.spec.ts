import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllergiesComponent } from './show-allergies.component';

describe('ShowAllergiesComponent', () => {
  let component: ShowAllergiesComponent;
  let fixture: ComponentFixture<ShowAllergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllergiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
