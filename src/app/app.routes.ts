import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './shared/ui/components/contact/contact.component';
import { Error404Component } from './error404/error404.component';
import { ContactEditComponent } from './home/contact-edit/contact-edit.component';

export const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children:[
      {
        path:'contact/:id',
        component: ContactComponent
      },
      {
        path:'contact/:id/edit',
        component: ContactEditComponent
      }
    ]
  },
  {
    path:'404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
