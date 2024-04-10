import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})

export class EditContactComponent implements OnInit {

  contact = {} as Contact;
  userForm: any;

  constructor(private formBuilder: FormBuilder, private contactsService: ContactsService , private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      celular: ['', [Validators.required]],
      telefone: ['', []],
      email: ['', [Validators.required, Validators.email]],
    });
 
    this.route.paramMap.subscribe(params => {
      const contactId: number = parseInt(params.get('id')!, 10);
      this.contactsService.getContact(contactId).subscribe((contact) => {
        this.contact = contact;
        this.userForm.patchValue({
          id: contact.id,
          nome: contact.nome,
          celular: contact.celular,
          telefone: contact.telefone,
          email: contact.email
          });
        });
      });
    }

  updateContact() {
    this.contact = this.userForm.value;
      this.contactsService.updateContact(this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
  }

  submitForm() {
    if (this.userForm?.valid) {
      this.updateContact();
    }
  }

}
