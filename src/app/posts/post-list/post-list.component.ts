import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import {Post} from '../post.model';
import {PageEvent} from "@angular/material"
import {PostsService} from '../post.service'
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(
    public postsService: PostsService,
    private authService: AuthService
    ) { }

  posts: Post[] = [];
  private postsSub: Subscription;
  private authStatusSub:Subscription;
  isLoading = true;
  totalPosts=0;
  postsPerPage = 2;
  currentPage=1;
  pageSizeOptions = [1,2,5,10]
  userAuthenticated = false;

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe(
        (postData: {posts: Post[], postCount:number})=>{
          this.posts=postData.posts;
          this.totalPosts = postData.postCount;
          this.isLoading = false;
        }
      );
      this.userAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated=>{
        this.userAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(id: string){
    this.isLoading = true;
    this.postsService.deletePost(id).subscribe(()=>{
      // re fetch posts
      this.postsService.getPosts(this.postsPerPage,this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.postsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex +1;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    console.log(pageData);
  }




}
