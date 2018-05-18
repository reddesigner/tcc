import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoIndicadorComponent } from './projeto-indicador.component';

describe('ProjetoIndicadorComponent', () => {
  let component: ProjetoIndicadorComponent;
  let fixture: ComponentFixture<ProjetoIndicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoIndicadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
