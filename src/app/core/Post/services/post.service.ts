import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}/api/v1/posts/all`)
  }

  public addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiServerUrl}/api/v1/posts/add`, post)
  }

  public updatePost(post: Post): Observable<Post> {
    console.log("From method")
    console.log(post)
    return this.http.put<Post>(`${this.apiServerUrl}/api/v1/posts/update`, post)
  }

  public deletePost(postId: number): Observable<void> {//Ничего не возвращаем, поэтому void
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/posts/delete/${postId}`)
  }

  public findPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiServerUrl}/post/find/${postId}`)
  }

  public getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiServerUrl}/post/findAllPostsByUserId/${userId}`)
  }

}
