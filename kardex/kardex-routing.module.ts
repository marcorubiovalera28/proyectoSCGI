import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KardexGeneralComponent } from './pages/kardex-general/kardex-general.component';
import { KardexReferenciaComponent } from './pages/kardex-referencia/kardex-referencia.component';

const routes: Routes = [
  { path: 'producto', component: KardexGeneralComponent },
  { path: 'referencia', component: KardexReferenciaComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KardexRoutingModule { }
