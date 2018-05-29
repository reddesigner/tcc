import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorEditComponent } from './indicador-edit.component';

describe('IndicadorEditComponent', () => {
  let component: IndicadorEditComponent;
  let fixture: ComponentFixture<IndicadorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
