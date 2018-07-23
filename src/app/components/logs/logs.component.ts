import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log'

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  constructor() { }

  ngOnInit() {
    this.logs = [
      {id: '1', text:'Generated Components', date: new Date('12/26/2018')},
      { id: '2', text: 'Added bootstrap', date: new Date('12/27/2018') },
      { id: '3', text: 'Added logs component', date: new Date('12/28/2018') }
    ]
  }

}
