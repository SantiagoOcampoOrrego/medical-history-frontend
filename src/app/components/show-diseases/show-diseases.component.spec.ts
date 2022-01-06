import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiseasesComponent } from './show-diseases.component';

describe('ShowDiseasesComponent', () => {
  let component: ShowDiseasesComponent;
  let fixture: ComponentFixture<ShowDiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDiseasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
