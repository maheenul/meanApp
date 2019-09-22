import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import {Post} from '../post.model';
import {PageEvent} from "@angular/material"
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
  isLoading = true;
  totalPosts=10;
  postsPerPage = 2;
  currentPage=1;
  pageSizeOptions = [1,2,5,10]

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[])=>{
        this.posts=posts;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string){
    this.postsService.deletePost(id);
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.postsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex +1;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    console.log(pageData);
  }




}
