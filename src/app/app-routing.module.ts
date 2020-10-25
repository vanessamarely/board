import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'board',
    loadChildren: './board/board.module#BoardModule'
  },
  { 
    path: '**', 
    redirectTo: '/404', pathMatch: 'full'
  },
  { 
    path: '404', 
    loadChildren: './not-found/not-found.module#NotFoundModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
