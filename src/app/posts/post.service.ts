import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts(){
    // The line below copies the array
    // instead of copying the pointer to the array
    // which occurs in the case of return this.posts
    return [...this.posts];
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, post:string){
    const postMsg: Post = {title:title, post:post}
    this.posts.push(postMsg)
    this.postsUpdated.next([...this.posts]);
  }
}
