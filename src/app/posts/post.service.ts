import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    // Unsubscrption handles automatically
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
      this.posts = postData.posts;
      // No need  to duplicate with ...this as data is coming from server
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, post:string){
    const postMsg: Post = {id:null,title:title, post:post};

    this.http.post<{message:string}>('http://localhost:3000/api/posts',postMsg)
    .subscribe((responseData)=>{
      console.log(responseData.message);

      // Push locally if server responds
      this.posts.push(postMsg)
      this.postsUpdated.next([...this.posts]);
    });


  }
}
