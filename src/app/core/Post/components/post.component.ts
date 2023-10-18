import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../services/post';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
//https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
public posts!: Post[];
public editPost!: Post;
public deletePost!: Post;

constructor(private postService: PostService) {}

ngOnInit() {
  //При запуске создаёт запрос на бэкэнд
  this.getPosts();
}

public getPosts(): void {
  this.postService.getPosts().subscribe(
    (response: Post[]) => {
      this.posts = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public getPostsByUser(userId: number): void {
  this.postService.getPostsByUser(userId).subscribe(
    (response: Post[]) => {
      this.posts = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onAddPost(addForm: NgForm): void {
  document.getElementById('add-post-form')?.click(); //закрыть поп-ап после сохранения файла
  this.postService.addPost(addForm.value).subscribe(
    (response: Post) => {
      console.log(response);
      this.getPosts();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public onUpdatePost(post: Post): void {
  console.log(post);

  this.postService.updatePost(post).subscribe(
    (response: Post) => {
      console.log(response);
      console.log(this.editPost);
      this.getPosts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeletePost(postId: number): void {
  this.postService.deletePost(postId).subscribe(
    (response: void) => {
      console.log(response);
      this.getPosts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public searchPosts(key: string): void {
  const results: Post[] = [];
  for (const post of this.posts) {
    if (
      post.postTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      post.postDescription.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ) {
      results.push(post);
    }
  }
  this.posts = results;
  if (results.length === 0 || !key) {
    this.getPosts();
  }
}

public onOpenModal(post: Post | null, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addPostModal');
  }
  if (mode === 'edit') {
    this.editPost = post;
    console.log(this.editPost);
    button.setAttribute('data-target', '#updatePostModal');
  }
  if (mode === 'delete') {
    this.deletePost = post;
    button.setAttribute('data-target', '#deletePostModal');
  }
  container?.appendChild(button);
  button.click();
}
}
