import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CollectionRequest } from '../../interfaces/collection-request.interface'

@Injectable({ providedIn: 'root' })
export class CollectionRequestService {
  private apiUrl = 'http://localhost:3001/requests';

  constructor(private http: HttpClient) {}

  createRequest(request: Partial<CollectionRequest>): Observable<CollectionRequest> {
    const requestData: CollectionRequest = {
      ...request,
      status: 'en attente',
      createdAt: new Date().toISOString(),
      userId : localStorage.getItem('currentUser') ? JSON.parse(<string>localStorage.getItem('currentUser') ).id : null
    } as CollectionRequest;

    return this.http.post<CollectionRequest>(this.apiUrl, requestData).pipe(
      catchError(this.handleError)
    );
  }

  getRequests(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code: ${error.status}, Message: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
