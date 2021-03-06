import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {Post} from '../post.model';
import {PostsService} from '../post.service'
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postsService: PostsService) { }

  posts: Post[] = [];
  private postsSub: Subscription;

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[])=>{
        this.posts=posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }






}
