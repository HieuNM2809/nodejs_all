import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './_helper/guard/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'join',pathMatch: 'full'
  },
  {
    path: 'join',
    loadChildren: () => import('./module/join/join.module').then(m => m.JoinModule)
  },
  {
    path: 'message',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./module/chat/chat.module').then(m => m.ChatModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
