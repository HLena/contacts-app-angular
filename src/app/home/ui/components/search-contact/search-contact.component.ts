import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../../../data-access/contact.service';
import { Contact } from '../../../../shared/interface/contact.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable,  debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-contact',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './search-contact.component.html',
  styleUrl: './search-contact.component.css',
  providers: [ContactService]
})
export class SearchContactComponent {

  public contacts: Contact[] = [];
  public selectedContactId: null | string = null;
  private searchTerms = new BehaviorSubject<string>('');
  isCreating: boolean = false

  constructor(private contactService: ContactService, private router: Router){}

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchContact(term))
    ).subscribe(
      results => this.contacts = results
    )

    this.router.events.subscribe(() => {
      this.isCreating = this.router.url.includes("create")
    })
  }

  searchContact(term: string): Observable<Contact[]>{
    if(term === '') {
      return this.contactService.getContacts();
    }
    return this.contactService.searchContactByName(term);

  }

  onSearchChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchTerms.next(inputElement.value);
    }
  }

  selectedContact(contactId: string):void {
    this.selectedContactId = contactId;
  }

}
