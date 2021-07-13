import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  author = {
    author: localStorage.getItem('userName')
  };
  posts: any = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getSpecificUserPost(this.author)
      .subscribe(res => {
        this.posts = res;
        console.log(this.posts);
      });
  }

}
