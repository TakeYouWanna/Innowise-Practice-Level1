import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      await import('./modules/organizer/organizer.module').then(
        (m) => m.OrganizerModule
      )
  },
  {
    path: 'authorization',
    loadChildren: async () =>
      await import('./modules/auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
