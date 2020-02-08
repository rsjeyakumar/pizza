import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import(`./components/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'pizza',
    loadChildren: () => import(`./components/pizza/pizza.module`).then(m => m.PizzaModule),
     canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    loadChildren: () => import(`./components/admin/admin.module`).then(m => m.AdminModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
