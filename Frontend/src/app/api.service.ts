import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

uploadImage(image: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', image);
  return this.http.post('https://py-backend-api.azurewebsites.net/extract-invoice-data/', formData);
}

  submitEditedData(data: any): Observable<any> {
    return this.http.post('YOUR_API_ENDPOINT_FOR_SUBMISSION', data);
  }
}
