import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoEquipeComponent } from './projeto-equipe.component';

describe('ProjetoEquipeComponent', () => {
  let component: ProjetoEquipeComponent;
  let fixture: ComponentFixture<ProjetoEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
