import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  responseData: any;
  responseArray: any[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) { }

  testResponseData = {
  };

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.responseData = null;
    }
  }

  // onUpload(): void {
  //   if (this.selectedFile) {
  //     this.responseData = { ...this.testResponseData };
  //     this.responseData.accuracy = this.calculateAccuracy(this.responseData);
  //     this.openSnackBar('Invoice image uploaded successfully!', 'Close');
  //   }
  // }

  uploading = false;

  onUpload(): void {
    if (this.selectedFile) {
      this.uploading = true; // Start showing spinner
      this.apiService.uploadImage(this.selectedFile).subscribe(
        (response) => {
          const cleanedResponse = this.cleanResponse(response);
  
          this.responseData = cleanedResponse;
          this.responseData.accuracy = this.calculateAccuracy(this.responseData);
          this.openSnackBar('Invoice image uploaded successfully!', 'Close');
          this.uploading = false; // Hide spinner on successful upload
        },
        (error) => {
          console.error('Error uploading image:', error);
          this.responseData = this.testResponseData;
          this.uploading = false; // Hide spinner on error
        }
      );
    }
  }
  
  
  cleanResponse(response: any): any {
    const cleanedResponse = { ...response };
  
    // Clean each field if it's a string
    for (const key in cleanedResponse) {
      if (Object.prototype.hasOwnProperty.call(cleanedResponse, key)) {
        if (typeof cleanedResponse[key] === 'string') {
          // Remove ** and leading whitespace
          cleanedResponse[key] = cleanedResponse[key].replace(/^\s*\*\*\s*/, '');
        }
      }
    }
  
    // Ensure itemizedList is cleaned (if it exists and is an array)
    if (cleanedResponse.itemizedList && Array.isArray(cleanedResponse.itemizedList)) {
      cleanedResponse.itemizedList = cleanedResponse.itemizedList.map((item: any) => {
        if (typeof item === 'string') {
          return item.replace(/^\s*\*\*\s*/, '');
        } else {
          return item;
        }
      });
    }
  
    return cleanedResponse;
  }
  
  

  onSubmitData(data: any): void {
    console.log('Edited Data:', data);
    this.responseData = { ...data };
    this.responseArray.push(this.responseData);
  }

  calculateAccuracy(response: any): string {
    const totalFields = Object.keys(response).length;
    const nonEmptyFields = Object.values(response).filter(value => value !== null && value !== '').length;
    return ((nonEmptyFields / totalFields) * 100).toFixed(2);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  downloadSingleResponse(): void {
    if (!this.responseData) {
        this.openSnackBar('No response data available to download.', 'Close');
        return;
    }

    const data: any[] = [
        ['Invoice Number', 'Date', 'Vendor Name', 'Vendor Address', 'Recipient Name', 'Recipient Address', 'Total Quantity', 'Total Weight', 'Weight Unit', 'Total Amount', 'Currency', 'Itemized List', 'Accuracy'],
        [
            this.responseData['Invoice Number'],
            this.responseData['Date'],
            this.responseData['Vendor Name'],
            this.responseData['Vendor Address'],
            this.responseData['Recipient Name'],
            this.responseData['Recipient Address'],
            this.responseData['Total Quantity'],
            this.responseData['Total Weight'],
            this.responseData['Weight Unit'],
            this.responseData['Total Amount'],
            this.responseData['Currency'],
            JSON.stringify(this.responseData['Itemized List']),
            this.responseData['Accuracy']
        ]
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'InvoiceData');

    const currentDate = new Date();
    const fileName = `SingleInvoiceData_${currentDate.getFullYear()}${('0' + (currentDate.getMonth() + 1)).slice(-2)}${('0' + currentDate.getDate()).slice(-2)}_${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}.xlsx`;

    XLSX.writeFile(wb, fileName);
}

downloadAllResponses(): void {
    const data: any[] = [
        ['Invoice Number', 'Date', 'Vendor Name', 'Vendor Address', 'Recipient Name', 'Recipient Address', 'Total Quantity', 'Total Weight', 'Weight Unit', 'Total Amount', 'Currency', 'Itemized List', 'Accuracy']
    ];

    this.responseArray.forEach((response, index) => {
        data.push([
            response['Invoice Number'],
            response['Date'],
            response['Vendor Name'],
            response['Vendor Address'],
            response['Recipient Name'],
            response['Recipient Address'],
            response['Total Quantity'],
            response['Total Weight'],
            response['Weight Unit'],
            response['Total Amount'],
            response['Currency'],
            JSON.stringify(response['Itemized List']),
            response['Accuracy']
        ]);
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'InvoiceData');

    const currentDate = new Date();
    const fileName = `AllInvoiceData_${currentDate.getFullYear()}${('0' + (currentDate.getMonth() + 1)).slice(-2)}${('0' + currentDate.getDate()).slice(-2)}_${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}.xlsx`;

    XLSX.writeFile(wb, fileName);
}

}
