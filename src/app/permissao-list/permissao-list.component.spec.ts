import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissaoListComponent } from './permissao-list.component';

describe('PermissaoListComponent', () => {
  let component: PermissaoListComponent;
  let fixture: ComponentFixture<PermissaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
