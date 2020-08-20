import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string) {
    // This Should Send a Web Request to Create a New List
    return this.webReqService.post('lists', { title });
  }

  getLists() {
    // This Should Send a Web Requests With all the Lists on the Database
    return this.webReqService.get('lists');
  }

  getTasks(listId: string) {
    // This Should Send a Web Requests With all the Tasks for all the Lists on the Database
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
}
