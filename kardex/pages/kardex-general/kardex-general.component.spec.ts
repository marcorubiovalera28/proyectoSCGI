import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexProductoComponent } from './kardex-general.component';

describe('KardexProductoComponent', () => {
  let component: KardexProductoComponent;
  let fixture: ComponentFixture<KardexProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KardexProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KardexProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
