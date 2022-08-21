import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoleGuard } from './guards/auth-role.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./shared/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    canActivate: [AuthRoleGuard],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule) },
  { path: 'roles', loadChildren: () => import('./components/roles/roles.module').then(m => m.RolesModule) },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
