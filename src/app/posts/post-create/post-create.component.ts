import { Component, OnInit} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
    ) { }

 newTitle = '';
 newPost = '';
 private mode = 'create';
 private postId = null;
 post: Post;
 isLoading = false;
//  post: Post = {
//    id:null,
//   title:'',
//   post:''
//  };


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');

        // loading
        this.isLoading = true;
        this.postsService.getPost(this.postId)
        .subscribe(postData=>{
          this.post = {id: postData._id, title:postData.title, post:postData.post}
        // loading finished
        this.isLoading  = false;
        });
        console.log(this.post);
      }else{
        // Create mode
      }
    }

    );
  }

  onSavePost(form: NgForm) {
    if(form.invalid){
      return;
    }else{
      this.isLoading = true;
      if (this.mode==='create'){
        this.postsService.addPost(form.value.newTitle,form.value.newPost);
        this.isLoading = false;
      }else{
        this.postsService.updatePost(
          this.postId,
          form.value.newTitle,
          form.value.newPost
        )
        this.isLoading = false;
      }

      // clears the previous inputs
      form.resetForm();
    }
  }
}
