import { Injectable } from '@angular/core';
import { Contact } from '../../shared/interface/contact.interface';
import { environments } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ContactService {

  private baseUrl: string = environments.baseUrl;
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialContacts();

  }

  private loadInitialContacts(): void {
    this.getContacts().subscribe(contacts => this.contactsSubject.next(contacts));
  }
  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`)
  }

  searchContactByName(query: string): Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`)
      .pipe(
        map((contacts) => contacts.filter(({name, lastname}) => {
          const fullname = `${name} ${lastname}`;
          return fullname.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        }))
      )
  }

  searchContact(term: string): void{
    if(term === '') {
      this.loadInitialContacts()
    } else {
      this.searchContactByName(term).subscribe(contacts => this.contactsSubject.next(contacts));
    }

  }

  getContactById(id: string):Observable<Contact>{
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${id}`);
  }

  updateContact(id: string, body: Partial<Contact>):Observable<Contact>{
    return this.http.patch<Contact>(`${this.baseUrl}/contacts/${id}`, body).pipe(
      tap(updatedContact => {
        const updatedContacts = this.contactsSubject.value.map(
          current => current.id === updatedContact.id ? updatedContact: current
        );
        this.contactsSubject.next(updatedContacts)
      })
    )
  }

  deleteContact(id: string):Observable<Contact>{
    return this.http.delete<Contact>(`${this.baseUrl}/contacts/${id}`);
  }
}
