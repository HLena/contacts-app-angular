import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Contact } from '../../../interface/contact.interface';
import { ContactService } from '../../../data-access/contact.service';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers: [ContactService],
})
export class ContactComponent implements OnInit {
  userId: string = '';
  contact: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.userId = params.get('id') || '';
          return this.contactService.getContactById(this.userId);
        })
      )
      .subscribe((contact) => {
        this.contact = contact;
      });
  }

  handleFavorite() {
    if (this.contact) {
      this.contact.favorite = !this.contact.favorite;
    }
  }
}
