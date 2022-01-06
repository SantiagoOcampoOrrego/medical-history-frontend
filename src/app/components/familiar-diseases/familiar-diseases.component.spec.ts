import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarDiseasesComponent } from './familiar-diseases.component';

describe('FamiliarDiseasesComponent', () => {
  let component: FamiliarDiseasesComponent;
  let fixture: ComponentFixture<FamiliarDiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliarDiseasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliarDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
