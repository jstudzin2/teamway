import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Question} from "./shared/model/Question";
import {Score} from "./shared/model/Score";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  loadQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(environment.BACKEND_URL + "/questions");
  }

  calculateScore(value: any): Observable<Score> {
    return this.http.post<Score>(environment.BACKEND_URL + "/questions/calculateScore", value);
  }
}
