import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutHomePageRoutingModule } from './out-home-routing.module';

import { OutHomePage } from './out-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutHomePageRoutingModule
  ],
  declarations: [OutHomePage]
})
export class OutHomePageModule {}
