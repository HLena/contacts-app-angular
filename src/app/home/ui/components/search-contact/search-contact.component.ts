import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../../data-access/contact.service';
import { Contact } from '../../../../shared/interface/contact.interface';
import { BehaviorSubject,  Subscription,  debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-contact',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './search-contact.component.html',
  styleUrl: './search-contact.component.css',
})
export class SearchContactComponent {

  public contacts: Contact[] = [];
  public selectedContactId: null | string = null;
  private searchTerms = new BehaviorSubject<string>('');
  private subscription!: Subscription;

  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.subscription = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.contactService.searchContact(term)
        return this.contactService.contacts$
      })
    ).subscribe(
      results => this.contacts = results
    )
    this.subscription.add(
      this.contactService.contacts$.subscribe(contacts => {
        this.contacts = contacts;
      })
    )

    const selectedContactId = localStorage.getItem('selectedContactId');
    if(selectedContactId) this.selectedContact(selectedContactId)
  }

  onSearchChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchTerms.next(inputElement.value.trim());
    }
  }

  selectedContact(contactId: string):void {
    this.selectedContactId = contactId;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
