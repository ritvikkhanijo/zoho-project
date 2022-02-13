import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  
  userDetails: any;
  commentArr: any;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res:any) => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
      }
    );
      this.getAllcomments();
  }

  getAllcomments(){
    console.log("heheh1")
    this.userService.allComments().subscribe(
      (res:any)=>{
       this.commentArr = res;
      },
      err=>{
        console.log(err);
      }
    )
  }

  postComment = () =>{
     this.userService.postcomment().subscribe(
      (res:any) => {
        this.getAllcomments(); 
      },
      (err:any) => { 
        this.getAllcomments(); 
      }
    );
  }

  filter(){
    this.userService.myComments().subscribe(
      (res:any)=>{
        this.commentArr = res;
      },
      err=>{
        console.log(err);
      }
    );
  }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


}
