import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoIndicadorFaseComponent } from './projeto-indicador-fase.component';

describe('ProjetoIndicadorFaseComponent', () => {
  let component: ProjetoIndicadorFaseComponent;
  let fixture: ComponentFixture<ProjetoIndicadorFaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoIndicadorFaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoIndicadorFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
