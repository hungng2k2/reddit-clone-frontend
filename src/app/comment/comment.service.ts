import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentPayload } from '../interface/comment.payload';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  readonly apiUrl = `${environment['apiUrl']}/api/comment`;

  constructor(private http: HttpClient) { }

  postComment$ = (comment: CommentPayload) => <Observable<CommentPayload>>
    this.http.post<CommentPayload>(this.apiUrl, comment)

  allCommentsForPost$ = (postId: number) => <Observable<CommentPayload[]>>
    this.http.get<CommentPayload[]>(`${this.apiUrl}/by-postId/${postId}`)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<never> => {
          console.log(error);
          return throwError(`An error occured - Error code: ${error.status}`);
        })
      )

  allCommentsByUser$ = (username: string) => <Observable<CommentPayload[]>>
    this.http.get<CommentPayload[]>(`${this.apiUrl}/by-user/${username}`)
}
