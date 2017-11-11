import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

import 'rxjs/add/operator/map';
import { ITodo } from './ITodo';

@Injectable()
export class DataService {

   private baseUrl:string = "http://localhost:1609/api/todos"
   
    constructor(private http: Http) {

    }
    getTodos() {
        return this.http.get(this.baseUrl)
        .map((res: Response) => {
            return res.json();
        })
    }

    getTodo(id: number) {
        return this.http.get(this.baseUrl + '/' + id)
                    .map((res:Response) => res.json());
    }

    createTodo(todo: ITodo) {
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http
        .post(this.baseUrl,
            JSON.stringify(todo), 
            {headers : headers});
    }

    deleteTodo(id) {
        return this.http.delete(this.baseUrl + '/' + id);
    }

    updateTodo(todo: ITodo) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this.baseUrl + '/' + todo.id,JSON.stringify(todo), {headers: headers})
                    .map((res: Response) => {
                        return res.json();
                    });
    }
}