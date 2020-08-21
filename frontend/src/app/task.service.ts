import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getLists() {
    // This Should Send a Web Requests With all the Lists on the Database
    return this.webReqService.get('lists');
  }

  createList(title: string) {
    // This Should Send a Web Request to Create a New List
    return this.webReqService.post('lists', { title });
  }

  getTasks(listId: string) {
    // This Should Send a Web Requests With all the Tasks for all the Lists on the Database
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string) {
    // This Should Send a Web Request to Create a New Task
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }
}
