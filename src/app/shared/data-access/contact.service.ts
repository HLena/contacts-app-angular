import { Injectable } from '@angular/core';
import { Contact } from '../interface/contact.interface';
import { environments } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ContactService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`)
  }

  getContact(id: string):Observable<Contact>{
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${id}`);
  }

}
