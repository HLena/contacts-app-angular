import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchContactComponent } from './ui/components/search-contact/search-contact.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SearchContactComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
}
