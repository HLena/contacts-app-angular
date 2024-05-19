import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../shared/interface/contact.interface';
import { ContactService } from '../shared/data-access/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { SearchContactComponent } from './ui/components/search-contact/search-contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ContactEditComponent, SearchContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
}
