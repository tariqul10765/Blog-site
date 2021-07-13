import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../interfaces/post';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private createPostUrl = 'http://localhost:3000/api/create-post';
  private getPostUrl = 'http://localhost:3000/api/posts';
  private specificUserPostUrl = 'http://localhost:3000/api/specific-user-posts';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  createPost(data): Observable<any> {
    return this.http.post<any>(this.createPostUrl, data);
  }

  // tslint:disable-next-line:typedef
  getPost(){
    return this.http.get<Post>(this.getPostUrl);
  }

  // tslint:disable-next-line:typedef
  getSpecificUserPost(author){
    return this.http.post(this.specificUserPostUrl, author);
  }
}
