import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritocompraComponent } from './carritocompra.component';

describe('CarritocompraComponent', () => {
  let component: CarritocompraComponent;
  let fixture: ComponentFixture<CarritocompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarritocompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritocompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
