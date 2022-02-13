import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentObj, User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    email: '',
    password: '',
    secretKey: ''
  };
  commentUser: CommentObj = {
    comment: ''
  }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }
  
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials:any) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    let headers = new HttpHeaders()
   .set('content-type', 'application/json')
   .set("authorization", "Bearer " + this.getToken());
    return this.http.get(environment.apiBaseUrl + '/userProfile',{headers: headers});
  }

  postcomment(){
    let headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set("authorization", "Bearer " + this.getToken());    
    return this.http.post(environment.apiBaseUrl + '/createComment',this.commentUser,{headers: headers});
  }

  allComments(){
    return this.http.get(environment.apiBaseUrl+'/allComments',this.noAuthHeader);
  }

  myComments(){
    let headers = new HttpHeaders()
   .set('content-type', 'application/json')
   .set("authorization", "Bearer " + this.getToken());
    return this.http.get(environment.apiBaseUrl+'/myComments',{headers: headers});
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
