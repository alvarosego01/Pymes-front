import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyControlComponent } from './notify-control.component';

describe('NotifyControlComponent', () => {
  let component: NotifyControlComponent;
  let fixture: ComponentFixture<NotifyControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
