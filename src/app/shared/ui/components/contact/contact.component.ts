import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../../interface/contact.interface';
import { ContactService } from '../../../data-access/contact.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers: [ContactService],
})
export class ContactComponent implements OnInit {
  userId: string = "";
  contact: Contact | undefined;

  constructor(private route: ActivatedRoute, private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.userId = params.get("id") || "";
        return this.contactService.getContact(this.userId)
      })
    ).subscribe(contact => { this.contact = contact })
  }
}
