import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from '../services/post.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userProfileName: any = {};
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
      this.authService.authorizedUserData()
        .subscribe(res => {
          // console.log(res.data.userName);
          this.userProfileName = this.authService.getUserName();
        });
  }
  // postCategory(cat){
  //   this.catWisePosts = this.postService.getPost().filter((post) => post.category === cat);
  //   this.sendData.emit(this.catWisePosts);
  // }

}
