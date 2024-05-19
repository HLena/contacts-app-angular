import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../../shared/interface/contact.interface';
import { switchMap } from 'rxjs';
import { ContactService } from '../data-access/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
  providers: [ContactService]
})
export class ContactEditComponent {
  userId: string = '';
  contact: Contact | undefined;
  formContactData: Contact = {} as Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.userId = params.get('id') || '';
          return this.contactService.getContactById(this.userId);
        })
      )
      .subscribe((contact) => {
        this.contact = contact;
        this.formContactData = {...this.contact}
      });
  }

  onSubmit(form: NgForm){
    if(form.valid) {
      this.contactService.updateContact(this.userId, this.formContactData).subscribe()
      this.router.navigate(['/contact', this.userId])
    }
  }
}
