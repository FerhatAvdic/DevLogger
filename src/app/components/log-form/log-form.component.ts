import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  formInput: Log;
  isNew: Boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.formInput = {
      id: null,
      text:null,
      date:null
    }
    // Subscribe to the selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if(log.id != null){
        this.isNew = false;
        this.formInput.id = log.id;
        this.formInput.text = log.text;
        this.formInput.date = log.date;
      }
    });
    this.logService.stateClear.subscribe(clear => {
      if (clear) {
        this.formInput = {
          id: null,
          text: null,
          date: null
        }
        this.isNew = true;
      }
    });
  }

  onSubmit(){
    // Check if new log
    if(this.isNew) {
      //  create new log
      const newLog = {
        id: this.generateId(),
        text: this.formInput.text,
        date: new Date()
      }
      // Add log
      this.logService.addLog(newLog);
    } else{
      // Update log
      const updLog = {
        id: this.formInput.id,
        text: this.formInput.text,
        date: new Date()
      }
      this.logService.updateLog(updLog);
    }
    this.clearState();
  }

  clearState(){
    this.formInput = {
      id: null,
      text: null,
      date: null
    }
    this.isNew = true;
    this.logService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
