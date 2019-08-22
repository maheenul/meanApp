import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meanApp';
  storedPosts = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
