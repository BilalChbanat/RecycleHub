import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../interfaces/collection-request.interface';
import { CollectorActions } from './collector.actions';
import {
  selectFilteredRequests,
  selectLoading,
  selectError
} from './collector.selectors';
import { NgForOf, NgIf, AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-collecteur',
  templateUrl: './collecteur.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    NgClass
  ]
})
export class CollecteurComponent implements OnInit {
  requests$: Observable<CollectionRequest[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userLocation: string = '';

  constructor(private store: Store) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userLocation = currentUser.address;

    // Initialize the observables
    this.requests$ = this.store.select(selectFilteredRequests(this.userLocation));
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  readonly STATUS = {
    EN_ATTENTE: 'en attente',
    OCCUPEE: 'occupee',
    EN_COURS: 'en cours',
    VALIDEE: 'validee',
    REJETEE: 'rejetee'
  } as const;

  ngOnInit(): void {
    // Dispatch the load action when component initializes
    this.store.dispatch(CollectorActions.loadRequests({ userLocation: this.userLocation }));
  }

  getWasteTypes(wastes: any): string[] {
    return Object.keys(wastes).filter(type => wastes[type].selected);
  }

  acceptRequest(request: CollectionRequest): void {
    const updatedRequest = { ...request, status: this.STATUS.OCCUPEE };
    this.store.dispatch(CollectorActions.updateRequestStatus({ request: updatedRequest }));
  }


  rejectRequest(request: CollectionRequest): void {
    const updatedRequest = { ...request, status: this.STATUS.REJETEE };
    this.store.dispatch(CollectorActions.updateRequestStatus({ request: updatedRequest }));
  }
}
