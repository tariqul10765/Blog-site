import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-recent-post',
  templateUrl: './recent-post.component.html',
  styleUrls: ['./recent-post.component.scss']
})
export class RecentPostComponent implements OnInit {
  posts: any = [];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost()
      .subscribe(res => {
        for (let i = 0; i < 3; i++){
            this.posts.push(res[i]);
        }
        console.log(this.posts);
        // this.posts = res;
        // console.log(this.posts.title);
      });
  }

}
