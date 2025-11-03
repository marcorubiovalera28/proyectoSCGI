import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/producto.interface';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: false,
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss'
})
export class DetalleProductoComponent implements OnInit {
  producto!: Producto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ls: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      const lista = this.ls.getItem<Producto[]>('productos') || [];
      const encontrado = lista.find(p => p.id === id);

      if (encontrado) {
        this.producto = encontrado;
      } else {
        alert('Producto no encontrado');
        this.router.navigate(['/productos']);
      }
    });
  }

  volver() {
    this.router.navigate(['/productos']);
  }
}