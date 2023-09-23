import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { EpisodesComponent } from './components/episodes/episodes.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'episode/:id', component: EpisodesComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '', component: MainComponent },
  { path: '**', component: MainComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
