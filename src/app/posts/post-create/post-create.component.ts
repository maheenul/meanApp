import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  newPost1 = '';
  newPost2 = '';
  value2 = '';


  ngOnInit() {
  }

  onAddPost(value1: HTMLTextAreaElement) {
    this.newPost1 = value1.value;
    this.newPost2 = this.value2;
  }

}
