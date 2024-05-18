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

  getContactById(id: string):Observable<Contact>{
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${id}`);
  }

  updateContact(id: string, body: Partial<Contact>):Observable<Contact>{
    return this.http.patch<Contact>(`${this.baseUrl}/contacts/${id}`, body);
  }

  deleteContact(id: string):Observable<Contact>{
    return this.http.delete<Contact>(`${this.baseUrl}/contacts/${id}`);
  }
}
