import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ITodo } from './ITodo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  todos = [];

  todo: ITodo = {
    id: 0,
    name: '',
    isComplete: false
  };

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
   this.getTodos();
  }

    saveTodo() {
      if(this.todo.id != 0){
        this.dataService.updateTodo(this.todo)
        .subscribe(res => {
          this.getTodos();
          console.log('Updated Todo',this.todo);
          this.initTodo();
        });
      }
      else{
        this.dataService.createTodo(this.todo)
        .subscribe(res => {
          this.todos.splice(0, 0, this.todo);
          console.log(res.json());
          this.initTodo();
        });
      }
   
  }

  deleteTodo(todo) {
    this.dataService.deleteTodo(todo.id)
      .subscribe(response => {
        let index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      });
  }

  editTodo(id: number) {
    this.dataService.getTodo(id)
    .subscribe((todo: ITodo) => {
      this.todo = todo;
    })
  }

  getTodos() {
    this.dataService.getTodos()
    .subscribe((todos: any[]) => {
      this.todos = todos;
    });
  }

  initTodo() {
    this.todo = {id: 0, name: '', isComplete: false};
  }
}
