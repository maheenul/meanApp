import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    // Unsubscrption handles automatically
    this.http.get<{message: string, posts: any}>(
      'http://localhost:3000/api/posts'
      )
    .pipe(map((postData)=>{
      return postData.posts.map(post =>{
        return{
         title: post.title,
         content: post.content,
         id: post._id
        };
      });
    }))
    .subscribe(transformedPosts=>{
      this.posts = transformedPosts;
      // No need  to duplicate with ...this as data is coming from server
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, post:string){
    const postMsg: Post = {id:null,title:title, post:post};

    this.http.post<{message:string, postId:string}>('http://localhost:3000/api/posts',postMsg)
    .subscribe((responseData)=>{
      console.log(responseData.message);

      // fethces unique id
      const id = responseData.postId;
      postMsg.id = id;
      // Push locally if server responds
      this.posts.push(postMsg)
      this.postsUpdated.next([...this.posts]);
    });
  }


  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/'+postId)
    .subscribe(()=>{
      const updatedPosts = this.posts.filter(post=>post.id!==postId);
      this.posts=updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
