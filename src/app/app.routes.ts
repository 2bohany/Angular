import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TracksComponent } from './tracks/tracks.component';

export const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'tracks', component: TracksComponent },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }
];
