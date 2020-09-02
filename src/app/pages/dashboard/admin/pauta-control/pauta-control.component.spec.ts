import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PautaControlComponent } from './pauta-control.component';

describe('PautaControlComponent', () => {
  let component: PautaControlComponent;
  let fixture: ComponentFixture<PautaControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PautaControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PautaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
