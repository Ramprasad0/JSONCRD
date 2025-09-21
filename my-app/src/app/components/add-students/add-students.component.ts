import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentserviceService } from 'src/app/services/studentservice.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit{
//   formG!:FormGroup;
//   constructor(private fb:FormBuilder, 
//     private serviceCall:StudentserviceService
//   ){
//     this.formG=this.fb.group({
//       name:['',[Validators.required,Validators.minLength(6)]],
//       dob:['',[Validators.required , this.dateValid]],
      
// password: [
//   '',
//   [
//     Validators.required,
//     Validators.minLength(8),
//     Validators.maxLength(64),
//     // at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
//     Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
//   ]
// ],
// mobile: [
//   '',
//   [
//     Validators.required,
//     // 10 digits, starts with 6-9
//     Validators.pattern(/^[6-9]\d{9}$/)
//   ]
// ],

// email: [
//   '',
//   [Validators.required, Validators.email]
// ]

//     })
//   }

//   dateValid(cont:AbstractControl):ValidationErrors|null{

//     const datereg=/^\d{4}-\d{2}-\d{2}$/ ;
//     if(!datereg.test(cont.value)){
//       return {retVal:true}
//     }
// return null;
//   }

//   addInfo(){
//     if(this.formG.valid){
//       this.serviceCall.addStudent(this.formG.value).subscribe((data)=>{
//         alert("success student added");
//       })
//     }
//   }

formG!:FormGroup;
constructor(private fb:FormBuilder, private serviceCall:StudentserviceService,private route :Router){}

  ngOnInit(): void {
   this.formG=this.fb.group({
    name:['',[Validators.required,Validators.minLength(6)]],
    dob:['',[Validators.required,Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$')]],
    password:['',[Validators.required,this.validpassword]],
    mobile:['',[Validators.required,Validators.pattern('^(\\+91)?[6-9]\\d{9}$')]],
    email:['',[Validators.required,Validators.email]],
   // mobile:['',[Validators.required,Validators.pattern('')]]
  })
  }

  newStudent!:Student;

  validpassword(control:AbstractControl):ValidationErrors|null{
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const valid = passwordRegex.test(control.value);
  return valid ? null : { weakPassword: true };
  }

  addInfo(){
        if(this.formG.valid){
          this.serviceCall.addStudent(this.formG.value).subscribe((data)=>{
            alert("success student added");
            this.formG.reset();
            this.route.navigate(['/view'])
            console.log(data);
            this.newStudent={...data}
            console.log(this.newStudent)
          })
        }
      }
}
