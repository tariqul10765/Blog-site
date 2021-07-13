import { Component, OnInit } from '@angular/core';
import {Post} from '../interfaces/post';
import {PostService} from '../services/post.service';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];

  constructor(private postService: PostService,
              private authSevice: AuthService) { }
  file: File = null;
  formData: Post = {
    title: '',
    img: null,
    category: '',
    shortDes: '',
    content: ''
  };

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(form){
    console.log(this.formData.img);
    // console.log(val);
    // if (!(this.formData.content.length === 0)) {
    const fd = new FormData();
    fd.append('author', this.authSevice.getUserName());
    fd.append('profile', this.file);
    fd.append('title', this.formData.title);
    fd.append('shortDes', this.formData.shortDes);
    fd.append('category', this.formData.category);
    fd.append('content', this.formData.content);

    this.postService.createPost(fd)
        .subscribe((res) => {
          console.log(res);

        }, (err) => {
          console.log(err.error.text);
        });
    // this.formData = {
    //     title: '',
    //     category: '',
    //     shortDes: '',
    //     content: ''
    //   };
    this.file = null;
    this.files = [];
    form.reset();

    // }
  }

  // tslint:disable-next-line:typedef
  onFileSelect(event){
    // console.log(event.target.files[0]);
    this.file = (event.target.files[0] as File);
  }


  /**
   * for image picker
   */

  // tslint:disable-next-line:typedef
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          this.file = file;
          console.log(file);

          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  // tslint:disable-next-line:typedef
  public fileOver(event){
    //console.log(event);
  }

  // tslint:disable-next-line:typedef
  public fileLeave(event){
    //console.log(event);
  }

}
