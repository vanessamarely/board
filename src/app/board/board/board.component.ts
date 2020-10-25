import { Component, OnInit } from '@angular/core';
import { CardSchema, ListSchema } from './../../core/models';
import { ApiService, TasksService } from './../../core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  lists: ListSchema[];
  cardStore: CardSchema[] = [
  ];

  constructor(private apiService: ApiService, private tasksService: TasksService) { }

  ngOnInit(): void {
    // this.getDataList();
    this.getDataStored();
    // this.getDataStorage();
  }

  getDataList(): void {
    /* Data from Api */
    this.apiService.getApi()
      .subscribe(
        response => this.lists = response['list'],
        error => (console.log('Ups! we have an error: ', error))
    );
  }

  getDataStored(): void {
    this.tasksService.getBoardList$
      .subscribe(
        response => this.lists = response,
        error => (console.log('Ups! we have an error: ', error))
    );
  }

  getDataStorage(): void {
    this.lists = JSON.parse(localStorage.getItem('list'));
  }

}
