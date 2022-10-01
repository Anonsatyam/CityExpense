import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailedInfoComponent } from './detailed-info/detailed-info.component';
import { HomeComponent } from './home/home.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { InputFormComponent } from './input-form/input-form.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'details', component: InputFormComponent, children: [
      {
        path: 'details', component: InfoCardsComponent
      }
    ]
  },
  {
    path: 'detailInfo', component: DetailedInfoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
