import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Student } from '../model/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  // apiUrl:string = "https://ec2-65-0-109-228.projects.wecreateproblems.com/proxy/8000/student"

  // constructor(private httpCall:HttpClient) { }

  // addStudent(studentData:Student):Observable<any>{
  //   return this.httpCall.post(this.apiUrl , studentData);
  // }

  // viewStudents():Observable<any>{
  //   return this.httpCall.get(this.apiUrl);
  // }
  // viewById(id:string):Observable<any>{
  //   return this.httpCall.get(this.apiUrl+'/'+id);
  // }
  
  // deleteById(id:string):Observable<any>{
  //   return this.httpCall.delete(this.apiUrl+"/"+id);
  // }
  
  // updateById(id:string,std:Student):Observable<any>{
  //   return this.httpCall.put(this.apiUrl+"/"+id,std);
  // }

   apiUrl:string="https://ec2-13-204-87-149.projects.wecreateproblems.com/proxy/8000/student";

   constructor(private httpCall:HttpClient){}

   addStudent(std:Student):Observable<any>{
    return this.httpCall.post(this.apiUrl,std);
   }

   viewStudents():Observable<any>{
    return this.httpCall.get(this.apiUrl);
   }

   viewById(id:string):Observable<any>{
    return this.httpCall.get(this.apiUrl+"/"+id)
   }

   deleteById(id:string):Observable<any>{
    return this.httpCall.delete(this.apiUrl+"/"+id)
   }

   updateById(id:string,std:Student):Observable<any>{
    return this.httpCall.put(this.apiUrl+"/"+id,std)
   }



}
