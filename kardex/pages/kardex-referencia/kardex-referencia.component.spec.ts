import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexReferenciaComponent } from './kardex-referencia.component';

describe('KardexReferenciaComponent', () => {
  let component: KardexReferenciaComponent;
  let fixture: ComponentFixture<KardexReferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KardexReferenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KardexReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
