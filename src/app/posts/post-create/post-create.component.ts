import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

 newValue = '';


  ngOnInit() {
  }

  onAddPost(value1: HTMLTextAreaElement) {
    this.newPost = this.newValue;
  }

}
