import { Injectable } from '@angular/core';
import { Contact } from '../interface/contact.interface';
import { environments } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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
  getContactById(id: string):Observable<Contact>{
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${id}`);
  }

}
