import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  contributors = [
    { name: 'Raja Prabu P', icon: 'person' },
    { name: 'Sushmithaa S', icon: 'person' },
    { name: 'Vimal M', icon: 'person' },
    { name: 'Kalpana P', icon: 'person' },
    { name: 'Muthuvel D', icon: 'person' },
    { name: 'Kaviyarasan G', icon: 'person' }
  ];

}
