import { Component ,OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { resource } from 'selenium-webdriver/http';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  DATA={title:'',description:''};
  DATAedit={title:'',description:''};
  tasks:any=[];
  edit:any=[];
 

  constructor(private _addTasks: HttpService){};

  ngOnInit(){
    this.getTasksFromService();
  };
  ////////////
  getTasksFromService(){
      let getall=this._addTasks.getAllTask();
      getall.subscribe(data=>{
        console.log('all data:',data);
        this.tasks=data;
      })
  }

  submittasks(){
    let addone=this._addTasks.createOneTask(this.DATA);
    addone.subscribe(data=>{
      console.log('add a new task:',data);
      this.DATA={title:'',description:''};
      this.getTasksFromService();
  })
   
  }

  edittask(id:any){
    this.edit=[id];
    console.log(this.edit)
    let getone=this._addTasks.getOneTask(id);
    getone.subscribe(data=>{
      console.log('get one task:',data);
      let title:string=data[0].title
      let description:string=data[0].description
      this.DATAedit={title:title,description:description};
    })
  }

  submitedit(id:any){
    console.log(id)
    console.log(this.DATAedit)
    let updateone=this._addTasks.updateOneTask(id,this.DATAedit)
    updateone.subscribe(data=>{
      console.log('update one:',data);
      this.DATAedit={title:'',description:''};
      this.edit=[];
      this.getTasksFromService();
  });
   
  }

  deletetask(id:any){
    let deleteone=this._addTasks.deleteOneTask(id)
    deleteone.subscribe(data=>{
      console.log('delete one:',data);
    this.getTasksFromService();
    })
  }

}
