import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  len: any = [];
  posts: any = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPost()
      .subscribe(res => {
        this.len = res;
        for (let i = 3; i < this.len.length; i++){
            this.posts.push(res[i]);
        }
      });
  }

}
