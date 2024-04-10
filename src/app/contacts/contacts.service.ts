import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  url = 'http://localhost:8080/contato';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.url).pipe(retry(2), catchError(this.handleError));
  }
  
  getContact(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(this.url + '/' + id).pipe(retry(2), catchError(this.handleError));

  }

  searchContacts(anything: string): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.url + "/pesquisa/" + anything).pipe(retry(2), catchError(this.handleError));
  }

  saveContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.url, JSON.stringify(contact), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateContact(contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(this.url, JSON.stringify(contact), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteContact(id: number) {
    return this.httpClient.delete(this.url + '/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  undoDeleteContact(id:number) {
    return this.httpClient.patch(this.url + '/undelete/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  favoriteContact(id: number) {
    return this.httpClient.patch(this.url + '/favorite/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  desactiveContact(id: number) {
    return this.httpClient.patch(this.url + '/active/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  
  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
