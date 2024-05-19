import { Injectable } from '@angular/core';
import { Contact } from '../../shared/interface/contact.interface';
import { environments } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ContactService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

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
  getContactById(id: string):Observable<Contact | undefined>{
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${id}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.error('Contact not found: ', error);
          return of(undefined);
        }
        else {
          const err = new Error('An unexpected error happened.');
          return throwError(() => err);
        }
      })
    );
  }

  updateContact(id: string, body: Partial<Contact>):Observable<Contact>{
    return this.http.patch<Contact>(`${this.baseUrl}/contacts/${id}`, body);
  }

  deleteContact(id: string):Observable<Contact>{
    return this.http.delete<Contact>(`${this.baseUrl}/contacts/${id}`);
  }
}
