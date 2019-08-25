import { Component, OnInit} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService) { }

 newTitle = '';
 newPost = '';


  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if(form.invalid){
      return;
    }else{
      this.postsService.addPost(form.value.newTitle,form.value.newPost)
    }
  }
}
