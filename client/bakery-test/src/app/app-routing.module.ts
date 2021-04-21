import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackofficeGuard } from './pages/backoffice/backoffice.guard';

const ROUTES: Routes = [
  { path : "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule) },
  { path: "login", loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule) },
  {
    path: "backoffice",
    loadChildren: () => import("./pages/backoffice/backoffice.module").then(m => m.BackofficeModule),
    canLoad: [BackofficeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
