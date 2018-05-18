import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoCreateComponent } from './projeto-create.component';

describe('ProjetoCreateComponent', () => {
  let component: ProjetoCreateComponent;
  let fixture: ComponentFixture<ProjetoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
