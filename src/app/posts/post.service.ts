import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount:number}>();

  constructor(
    private http: HttpClient,
    private router: Router
    ){}

  getPosts(postsPerPage:number,currentPage:number){
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`
    // Unsubscrption handles automatically
    this.http.get<{message: string, posts: any, maxPosts:number}>(
      'http://localhost:3000/api/posts'+queryParams
      )
    .pipe(map(postData=>{
      return {
        posts: postData.posts.map(post =>{
          return{
            title: post.title,
            post: post.post,
            id: post._id,
            imagePath:post.imagePath
          };
        }),
        maxPosts: postData.maxPosts
      };
    }))
    .subscribe(transformedPostsData=>{
      this.posts = transformedPostsData.posts;
      // No need  to duplicate with ...this as data is coming from server
      this.postsUpdated.next(
        {
          posts: [...this.posts],
          postCount:transformedPostsData.maxPosts
        }
      );
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id:string){
    return this.http.get
    <{_id:string, title:string, post:string, imagePath:string}>
    ("http://localhost:3000/api/posts/"+id);
  }


  addPost(title: string, post:string, image:File){
    // const postMsg: Post = {id:null,title:title, post:post};
    const postData = new FormData();

    postData.append("title",title);
    postData.append("post",post);
    postData.append("image",image, title);


    this.http.post<{message:string, post:Post}>
  ('http://localhost:3000/api/posts',postData)
    .subscribe((responseData)=>{
      // pushing locally removed
      this.router.navigate(['/']);
    });
  }

  updatePost(id:string, title:string, post:string, image:File|string){
    let postData: Post | FormData;
    if (typeof(image)==='object'){
      postData = new FormData();
      postData.append("id",id);
      postData.append("title",title);
      postData.append("post",post);
      postData.append("image",image,title)
    }else{
      postData =
      { id:id,
        title:title,
        post:post,
        imagePath:image
      };
    }


    this.http.put("http://localhost:3000/api/posts/"+id,postData)
    .subscribe(response => {
      // updating locally removed (redundant)
      this.router.navigate(['/']);
    }
    )
  }

  deletePost(postId: string){
    return this.http.delete('http://localhost:3000/api/posts/'+postId)
  }
}
