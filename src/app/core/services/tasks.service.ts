import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardSchema, ListSchema } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly cardList = new BehaviorSubject<CardSchema[]>([]);
  private readonly boardList = new BehaviorSubject<ListSchema[]>([]);
  readonly list$ = this.boardList.asObservable();
  readonly cards$ = this.cardList.asObservable();
  private readonly selectedCard = new BehaviorSubject<CardSchema>(null);
  readonly selectedCard$ = this.cardList.asObservable();
  readonly getCardsList$ = this.cards$.pipe(
    map(cards => cards)
  );
  readonly getBoardList$ = this.list$.pipe(
    map(list => list)
  );

  constructor(private apiService: ApiService) { 
    this.loadInitialData();
  }

  get cards(): CardSchema[] {
    return this.cardList.getValue();
  }

  set cards(value: CardSchema[]) {
    this.cardList.next(value);
  }

  /* Load initial data to render in a component */
  loadInitialData(): any {
    return this.apiService.getApi()
      .subscribe(response => {
        if(!!response) {
          this.boardList.next(response['list']);
          this.setLocalStorage(response['list']);
        }
      })  
  }

  /* getter list of Board */
  get list(): ListSchema[] {
    return this.boardList.getValue();
  }

  /* setter list of Board */
  set list(value: ListSchema[]) {
    this.boardList.next(value);
  }

  /* Add new card to board list */
  addCard(data: CardSchema, list: ListSchema): void  {
    const tmpCard = data;
    this.cards = [
      ...this.cards,
      tmpCard
    ];
    const elementsIndex = 
      this.list.findIndex(element => element.id == list.id);
    this.list[elementsIndex].cards = this.cards;
    this.setLocalStorage(this.list);
  }

  /* Edit card on list */
  updateTask(data: CardSchema, list: ListSchema): void {
    
    this.cards = list.cards.map(element => {
      if(element.id === data.id){
        element.date = new Date(data.date);
        element.description = data.description;
        element.priority = data.priority;
      }
      return element;
    });
    
    const elementsIndex = 
      this.list.findIndex(element => element.id == list.id);
    this.list[elementsIndex].cards = this.cards;

    this.setLocalStorage(this.list);
  } 

  /* Remove a card of board list */
  removeTask(data: CardSchema, list: ListSchema): void {
    this.cards = this.cards.filter(card => card.id !== data.id);
    const elementsIndex = 
      this.list.findIndex(element => element.id == list.id);
    this.list[elementsIndex].cards = this.cards;
    this.setLocalStorage(this.list);
  }

  setLocalStorage(list: any): void{
    localStorage.setItem('list', JSON.stringify(list));
  }
}
