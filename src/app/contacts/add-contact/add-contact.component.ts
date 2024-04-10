import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  
  contact = {} as Contact;
  userForm: any;

  constructor(private formBuilder: FormBuilder, private contactsService: ContactsService , private router: Router) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nome: ['', Validators.required],
      celular: ['', [Validators.required]],
      telefone: ['', []],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  saveContact() {
    this.contact = this.userForm.value;
      this.contactsService.saveContact(this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
  }

  submitForm() {
    if (this.userForm?.valid) {
      this.saveContact();
    }
  }
  
}
