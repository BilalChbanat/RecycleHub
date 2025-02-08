import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CollectionRequest} from '../../interfaces/collection-request.interface';

@Injectable({
  providedIn: 'root'
})
export class CollecteurService {

  private apiUrl = 'http://localhost:3001/requests';

  constructor(private http: HttpClient) {}

  getRequests(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(this.apiUrl);
  }
}
