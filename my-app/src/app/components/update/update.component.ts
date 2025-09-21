import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StudentserviceService } from 'src/app/services/studentservice.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
  formG!:FormGroup;
  idValues!:string
  constructor(private fb:FormBuilder, 
    private serviceCall:StudentserviceService,
    private ar:ActivatedRoute,
    private r:Router
  ){}

  ngOnInit(): void {
    
    this.idValues=String(this.ar.snapshot.paramMap.get('id'));
    if(this.idValues){
      this.serviceCall.viewById(this.idValues).subscribe((data)=>{
        this.formG.patchValue(data);
      })
    }  
    this.formG=this.fb.group({
      name:['',[Validators.required,Validators.minLength(6)]],
      dob:['',[Validators.required , this.dateValid]],
      
password: [
  '',
  [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(64),
    // at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  ]
],
mobile: [
  '',
  [
    Validators.required,
    // 10 digits, starts with 6-9
    Validators.pattern(/^[6-9]\d{9}$/)
  ]
],

email: [
  '',
  [Validators.required, Validators.email]
]

    })
  }
  


  dateValid(cont:AbstractControl):ValidationErrors|null{

    const datereg=/^\d{4}-\d{2}-\d{2}$/ ;
    if(!datereg.test(cont.value)){
      return {retVal:true}
    }
return null;
  }



  addInfo(){
    if(this.formG.valid){
      this.serviceCall.updateById(this.idValues,this.formG.value).subscribe((data)=>{
        alert("Updated Successfully");

        this.r.navigate(['view'])
      })
    }
  }
}
