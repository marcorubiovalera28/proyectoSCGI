import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ConfiguracionGeneralComponent } from './pages/configuracion-general/configuracion-general.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ConfiguracionGeneralComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule
  ]
})
export class SettingsModule { }
