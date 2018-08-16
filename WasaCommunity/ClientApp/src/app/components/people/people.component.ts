import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  animations: [fadeInOut]
})
export class PeopleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
