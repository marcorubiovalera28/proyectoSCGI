import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMovimientoComponent } from './formulario-movimiento.component';


describe('FormularioMovimientoComponent', () => {
  let component: FormularioMovimientoComponent;
  let fixture: ComponentFixture<FormularioMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioMovimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
