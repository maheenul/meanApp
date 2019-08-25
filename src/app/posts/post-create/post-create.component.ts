import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Post } from '../post.model'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

 newTitle = '';
 newPost = '';
 posts: Post [] = [];
 @Output() postCreated = new EventEmitter<Post>();


  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if(form.invalid){
      return;
    }else{
      const post: Post = {
        title: form.value.newTitle,
        post: form.value.newPost
      };
      this.postCreated.emit(post);
    }
  }
}
