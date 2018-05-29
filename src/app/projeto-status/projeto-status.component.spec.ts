import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoStatusComponent } from './projeto-status.component';

describe('ProjetoStatusComponent', () => {
  let component: ProjetoStatusComponent;
  let fixture: ComponentFixture<ProjetoStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
