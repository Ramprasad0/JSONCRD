import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { Student } from 'src/app/model/student';
import { StudentserviceService } from 'src/app/services/studentservice.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})

export class ViewStudentsComponent {

  formG!:FormGroup;
  constructor(
    private serviceCall:StudentserviceService
  ){
  }

  data$:Observable<Student[]>=of([]);
  finaldata$:Observable<Student[]>=of([]);

  ngOnInit():void{
    this.getData();
  }

  getData(){
    this.data$=this.serviceCall.viewStudents();
    this.finaldata$=this.data$.
    pipe(map((data)=>data.sort((a:Student,b:Student)=>b.name.localeCompare(a.name))));
  }
  serachValue(e:any){
    //console.log(e.target.value)
    const valuegiven=e.target.value;
    if(!valuegiven){
      this.finaldata$=this.data$;
      return;
    }else{
      this.finaldata$=this.data$
      .pipe(map((data)=>{
        return data.filter(
          (student)=>{
           return  student.id.toString().includes(valuegiven)|| student.name.toString().includes(valuegiven)
          }
        )
      }))
    }
  }
}
