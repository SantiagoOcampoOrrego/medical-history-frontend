import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProcedureComponent } from './show-procedure.component';

describe('ShowProcedureComponent', () => {
  let component: ShowProcedureComponent;
  let fixture: ComponentFixture<ShowProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
