import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'details/:id', component: DetailsComponent },
  { path: 'home', component: MainComponent },
  { path: '', component: MainComponent },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
