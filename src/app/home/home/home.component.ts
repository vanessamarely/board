import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardList: any;
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getPrioritiesTask();
  }

  getPrioritiesTask(): void {
    this.tasksService.getBoardList$
      .subscribe(
        response => {
          let cards = [];
          const list = response;
          list.map(element => {
            element.cards.map(card => {
              if(card.priority == 'urgent'){
                cards.push(card)
              }
            });
          });
          this.cardList = cards;
        },
        error => (console.log('Ups! we have an error: ', error))
    );
  }

}
