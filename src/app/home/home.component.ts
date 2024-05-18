import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../shared/interface/contact.interface';
import { ContactService } from '../shared/data-access/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ContactEditComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ContactService]
})
export class HomeComponent implements OnInit{

  public contacts: Contact[] = [];

  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts)
  }

}
