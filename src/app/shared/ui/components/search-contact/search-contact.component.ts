import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../../data-access/contact.service';
import { Contact } from '../../../interface/contact.interface';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-contact',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './search-contact.component.html',
  styleUrl: './search-contact.component.css',
  providers: [ContactService]
})
export class SearchContactComponent {

  public contacts: Contact[] = [];
  public searchInput = new FormControl();
  public selectedContactId: null | string = null;

  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts)
  }

  searchContact(){
    const query = this.searchInput.value || '';
    this.contactService.searchContactByName(query)
      .subscribe(contacts => this.contacts = contacts)
  }

  selectedContact(contactId: string):void {
    this.selectedContactId = contactId;
  }

}
