import { Component, OnInit} from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormGroup,Validator, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator'

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
 form: FormGroup;
 imagePreview: any;


  ngOnInit() {
    this.form = new FormGroup({
      'title':new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'post': new FormControl(null, {
        validators:[Validators.required]
      }),
      'image': new FormControl(null,{
        validators:[Validators.required], asyncValidators:[mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');

        // loading
        this.isLoading = true;
        this.postsService.getPost(this.postId)
        .subscribe(postData=>{
          this.post =
          {
            id: postData._id,
            title:postData.title,
            post:postData.post,
            imagePath:postData.imagePath
          }
          // loading finished
          this.isLoading  = false;
          this.form.setValue({
          'title':this.post.title,
          'post':this.post.post,
          'image':this.post.imagePath
          })
        });
      }else{
        // Create mode
      }
    }

    );
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    };

  }

  onSavePost() {
    this.isLoading = true;
    console.log(this.isLoading);
    if(this.form.invalid){
      this.isLoading = false;
      return;
    }else{
      if (this.mode==='create'){
        this.postsService.addPost(this.form.value.title,this.form.value.post,this.form.value.image);

      }else{
        this.postsService.updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.post,
          this.form.value.image
        )
      }

      // clears the previous inputs
      //this.form.reset();
    }
    console.log('stop');
    this.isLoading = false;
  }
}
