import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

 newTitle = '';
 newPost = '';
 posts = [];
 @Output() postCreated = new EventEmitter();


  ngOnInit() {
  }

  onAddPost() {
    const post = {
      title: this.newTitle,
      post: this.newPost
    };
    this.postCreated.emit(post);
  }

}
