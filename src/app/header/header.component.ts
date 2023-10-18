import { Component } from '@angular/core';
import { PostComponent } from '../core/Post/components/post.component';
import { Post } from '../core/Post/services/post';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from '../core/Post/services/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private postService: PostService) {}

// public searchPosts(key: string): void {
//   const results: Post[] = [];
//   for (const post of this.postComponent.posts) {
//     if (
//       post.postTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
//       post.postDescription.toLowerCase().indexOf(key.toLowerCase()) !== -1
//     ) {
//     }
//   }
//   this.postComponent.posts = results;
//   if (results.length === 0 || !key) {
//     this.postComponent.getPosts();
//   }
// }

public onOpenModal(post: Post | null, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addPostModal');
  }
}

public onAddPost(addForm: NgForm): void {
  document.getElementById('add-post-form')?.click(); //закрыть поп-ап после сохранения файла
  this.postService.addPost(addForm.value).subscribe(
    (response: Post) => {
      console.log(response);
      this.postService.getPosts();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
}
