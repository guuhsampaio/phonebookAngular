import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactsService } from './contacts.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contact = {} as Contact;
  contacts: Contact[] = [];
  mostrarButtonDesfazer: Boolean = false;
  undoId: number = 0;
  progress: number = 100;

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  searchContacts(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if(value != "") {
      return this.contactService.searchContacts(value).subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
    }
    return this.getContacts();
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.showButtonUndo(id);
      this.startProgress();
      this.deleteContactById(id);
      setTimeout(() => {
        this.mostrarButtonDesfazer = false;
        this.undoId = 0;
        this.getContacts();
      }, 20000);
    });
  }

  showButtonUndo(id: number) {
    this.undoId = id;
    this.mostrarButtonDesfazer = true;
  }

  undoDeleteContact(id: number) {
    this.contactService.undoDeleteContact(id).subscribe(() => {
      this.mostrarButtonDesfazer = false;
      this.undoId = 0;
      this.getContacts();
    });
  }

  deleteContactById(id: number) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
  }

  startProgress() {
    this.progress = 100;
    const interval = setInterval(() => {
      this.progress -= 0.25;
      if (this.progress <= 0) {
        clearInterval(interval);
      }
    }, 50);
  }

  favoriteContact(id: number) {
    this.contactService.favoriteContact(id).subscribe(() => {
      this.getContacts();
    });
  }

  desactiveContact(id: number) {
    this.contactService.desactiveContact(id).subscribe(() => {
      this.getContacts();
    });
  }

}
