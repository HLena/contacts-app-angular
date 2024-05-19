import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../../shared/interface/contact.interface';
import { catchError, of, switchMap } from 'rxjs';
import { ContactService } from '../data-access/contact.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IdGeneratorService } from '../../shared/services/id-generator.service';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
  providers: [ContactService, IdGeneratorService],
})
export class ContactEditComponent {
  userId: string = '';
  contact: Contact | undefined;
  formContactData: Contact = {} as Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private idGeneratorService: IdGeneratorService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.userId = params.get('id') || '';
          if (this.userId)
            return this.contactService.getContactById(this.userId);
          return of({} as Contact);
        })
      )
      .subscribe((contact) => {
        this.contact = contact;
        if(this.contact) this.formContactData = { ...this.contact };
      });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.userId) {
        this.contactService
          .updateContact(this.userId, this.formContactData)
          .subscribe();
        this.router.navigate(['/contact', this.userId]);
      } else {
        const newUser = {
          ...this.formContactData,
          id: this.generateNewUserId(
            this.formContactData.name,
            this.formContactData.lastname
          ),
        };
        this.contactService.createContact(newUser).subscribe({
          next: (user) => {
            console.log(user);
            this.router.navigate(['/contact', user.id]);
          },
        });
      }
    } else {
      console.log('something when wrong');
    }
  }

  generateNewUserId(name: string, lastname: string): string {
    return `${name.trim()}-${lastname.trim()}-${this.idGeneratorService.generateRandomID(
      2
    )}`;
  }

  handleCancel() {
    this.location.back()
  }
}
