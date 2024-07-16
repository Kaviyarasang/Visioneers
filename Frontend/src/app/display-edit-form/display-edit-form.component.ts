import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-edit-form',
  templateUrl: './display-edit-form.component.html',
  styleUrls: ['./display-edit-form.component.css']
})
export class DisplayEditFormComponent {
  @Input() data: any;
  @Output() submitData = new EventEmitter<any>();

  constructor(private snackBar: MatSnackBar) { }

  fields = [
    { label: 'Invoice Number', name: 'Invoice Number' },
    { label: 'Date', name: 'Date' },
    { label: 'Vendor Name', name: 'Vendor Name' },
    { label: 'Vendor Address', name: 'Vendor Address' },
    { label: 'Recipient Name', name: 'Recipient Name' },
    { label: 'Recipient Address', name: 'Recipient Address' },
    { label: 'Total Quantity', name: 'Total Quantity' },
    { label: 'Total Weight', name: 'Total Weight' },
    { label: 'Weight Unit', name: 'Weight Unit' },
    { label: 'Total Amount', name: 'Total Amount' },
    { label: 'Currency', name: 'Currency' },
    { label: 'Itemized List', name: 'Itemized List' },
    { label: 'Accuracy', name: 'accuracy' }
];

  leftFields = this.fields.slice(0, Math.ceil(this.fields.length / 2));
  rightFields = this.fields.slice(Math.ceil(this.fields.length / 2));

  onSubmit() {
    this.submitData.emit(this.data);
    this.openSnackBar('Invoice-Form submitted successfully!', 'Close');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  isEmpty(field: string): boolean {
    return !this.data[field];
  }
}
