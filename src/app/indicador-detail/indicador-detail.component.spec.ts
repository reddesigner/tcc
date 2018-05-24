import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorDetailComponent } from './indicador-detail.component';

describe('IndicadorDetailComponent', () => {
  let component: IndicadorDetailComponent;
  let fixture: ComponentFixture<IndicadorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
