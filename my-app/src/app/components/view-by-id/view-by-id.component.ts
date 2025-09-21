import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentserviceService } from 'src/app/services/studentservice.service';

@Component({
  selector: 'app-view-by-id',
  templateUrl: './view-by-id.component.html',
  styleUrls: ['./view-by-id.component.css']
})
export class ViewByIdComponent implements OnInit{
  id!:string;
  data$: any;
  constructor(private service:StudentserviceService , private ar :ActivatedRoute){}
  ngOnInit(): void{
    this.id=String(this.ar.snapshot.paramMap.get('id'))
    alert(this.id);
    this.getData(this.id);
  }
 
 
  getData(id:any){
     this.service.viewById(id).subscribe((data)=>{
      alert("view by id");
      this.data$=data;
    })
  }



}
