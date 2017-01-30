/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestDragComponent } from './TestDrag.component';

describe('TestDragComponent', () => {
  let component: TestDragComponent;
  let fixture: ComponentFixture<TestDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});