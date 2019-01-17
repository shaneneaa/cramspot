import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkspacePage } from './list-workspace.page';

describe('ListWorkspacePage', () => {
  let component: ListWorkspacePage;
  let fixture: ComponentFixture<ListWorkspacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWorkspacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkspacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
