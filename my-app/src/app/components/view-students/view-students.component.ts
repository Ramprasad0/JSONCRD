import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    private serviceCall:StudentserviceService,private route:Router
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
    // pipe(map((data)=>data.sort((a:Student,b:Student)=>b.name.localeCompare(a.name))));
    pipe(map((data)=>data.sort((a:Student,b:Student)=>b.name.localeCompare(a.name))))
  }
  serachValue(e:any){
    //console.log(e.target.value)
    const valuegiven=e.target.value;
    if(!valuegiven){
      this.finaldata$=this.data$;
      return;
    }else{
      // this.finaldata$=this.data$
      // .pipe(map((data)=>{
      //   return data.filter(
      //     (student)=>{
      //      return student.id.toString().includes(valuegiven) || student.name.toString().includes(valuegiven)
      //     }
      //   )
      // }))

      const lower =valuegiven.toString().toLowerCase();

      this.finaldata$=this.data$.
      pipe(map((data)=>{
        return data.filter(
         (student)=>{
          return student.id.toString().toLowerCase().includes(lower) || student.name.toString().toLowerCase().includes(lower)
        }
      )}
    ))
    }
  }

  deletebyId(id:string) {
this.serviceCall.deleteById(id).subscribe((data)=>{
  console.log(data);
  // this.route.navigate(['/view'])
  this.getData();
})
}
}
