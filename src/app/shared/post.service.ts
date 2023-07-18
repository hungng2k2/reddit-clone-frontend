import { CreatePostPayload } from './../interface/create-post.payload';
import { PostModel } from './../interface/post.payload';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../interface/custom-response.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly apiUrl = `${environment['apiUrl']}/api/post`;

  constructor(private http: HttpClient) { }

  posts$ = <Observable<CustomResponse<PostModel[]>>>
    this.http.get<CustomResponse<PostModel[]>>(`${this.apiUrl}`);

  postsByUser$ = (username: string) => <Observable<CustomResponse<PostModel[]>>>
    this.http.get<CustomResponse<PostModel[]>>(`${this.apiUrl}/by-user/${username}`);

  postsBySubreddit$ = (id: number) => <Observable<CustomResponse<PostModel[]>>>
    this.http.get<CustomResponse<PostModel[]>>(`${this.apiUrl}/by-subreddit/${id}`);

  post$ = (id: number) => <Observable<CustomResponse<PostModel>>>
    this.http.get<CustomResponse<PostModel>>(`${this.apiUrl}/${id}`);


  createPost$ = (createPostPayload: CreatePostPayload) => <Observable<CustomResponse<PostModel>>>
    this.http.post<CustomResponse<PostModel>>(this.apiUrl, createPostPayload)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<never> => {
          console.log(error);
          return throwError(`An error occured - Error code: ${error.status}`);
        })
      )
}
