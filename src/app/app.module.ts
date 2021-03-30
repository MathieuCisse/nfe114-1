import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuard } from './auth.guard';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from '../shared/states/panier-state';
import { LoginComponent } from './login/login.component'
import { ApiHttpInterceptor } from './api-http-interceptor';

const appRoutes : Routes = [
  {path:'',component:AccueilComponent},
  {path:'connexion',component:LoginComponent},
  {path:'formulaire',component:FormulaireComponent},
  {path: 'produits', canActivate: [AuthGuard], loadChildren: () => import('./produits/produits.module').then(m => m.ProduitsModule)}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormulaireComponent,
    AccueilComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,
    RouterModule.forRoot (appRoutes),
    NgxsModule.forRoot ([PanierState])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,   useClass: ApiHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
