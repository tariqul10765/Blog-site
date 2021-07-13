import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from '../services/post.service';
import {log} from 'util';
import {Post} from '../interfaces/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  postId: string;
  post: any;
  singlePost;
  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.postId = params.get('id');
      this.postService.getPost()
        .subscribe(post => {
          this.post = post;
          this.singlePost = this.post.find(p => p._id === this.postId);
        });


    });
    console.log(this.singlePost);
  }

    // this.activatedRoute.paramMap.subscribe(param => {
    //   this.postId = param.get('id');
    //   console.log(this.postId);

    //   this.post = this.postService.getPost().find(post => post._id === this.postId);

    // })

  // tslint:disable-next-line:typedef
  postComment(comment){
    console.log(comment.value);
  }
}
