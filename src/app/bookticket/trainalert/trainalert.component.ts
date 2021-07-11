import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-trainalert',
  templateUrl: './trainalert.component.html',
  styleUrls: ['./trainalert.component.css']
})
export class TrainalertComponent implements OnInit {

  @Input() errorMessage:string;

  constructor() { }

  ngOnInit(): void {
  }

}
