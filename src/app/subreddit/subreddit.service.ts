import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CustomResponse } from '../interface/custom-response.payload';
import { SubredditModel } from '../interface/subreddit.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  readonly apiUrl = `${environment['apiUrl']}/api/subreddit`;

  constructor(private http: HttpClient) { }

  subreddits$ = <Observable<CustomResponse<SubredditModel[]>>>
    this.http.get<CustomResponse<SubredditModel[]>>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        console.log(error);
        return throwError(`An error occured - Error code: ${error.status}`);
      })
    );

  createSubreddit$ = (subreddit: SubredditModel) => <Observable<SubredditModel>>
    this.http.post<SubredditModel>(this.apiUrl, subreddit)

}
