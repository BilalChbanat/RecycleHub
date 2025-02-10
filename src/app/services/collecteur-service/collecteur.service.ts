import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {CollectionRequest} from '../../interfaces/collection-request.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollecteurService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {
  }

  getRequests(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(`${this.apiUrl}/requests`);
  }

  updateRequest(request: CollectionRequest): Observable<CollectionRequest> {
    const url = `${this.apiUrl}/requests/${request.id}`;

    if (request.status === 'validee' && request.pointsAwarded && request.particulierId) {
      return forkJoin({
        request: this.http.put<CollectionRequest>(url, request),
        points: this.http.post(`${this.apiUrl}/users/${request.particulierId}/points`, {
          points: request.pointsAwarded
        })
      }).pipe(
        map(result => result.request)
      );
    }
    return this.http.put<CollectionRequest>(url, request);
  }
}
