import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailComponent} from './detail/detail.component';
import {CatalogueComponent} from './catalogue/catalogue.component';

import {RouterModule, Routes} from '@angular/router';

const appRoutes : Routes = [
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'detail/:id', component: DetailComponent },
]


@NgModule({
  declarations: [
   CatalogueComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild (appRoutes)
  ]
})
export class ProduitsModule { }
