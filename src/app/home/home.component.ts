import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactService } from './data-access/contact.service';
import { SearchContactComponent } from './ui/components/search-contact/search-contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SearchContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
}
