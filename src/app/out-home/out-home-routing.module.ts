import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutHomePage } from './out-home.page';

const routes: Routes = [
  {
    path: '',
    component: OutHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutHomePageRoutingModule {}
