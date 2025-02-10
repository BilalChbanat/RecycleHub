import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CollectionRequest, POINTS_PER_KG, WasteEntry} from '../interfaces/collection-request.interface';
import {CollectorActions} from './collector.actions';
import {selectFilteredRequests, selectLoading, selectError} from './collector.selectors';
import {NgForOf, NgIf, AsyncPipe, NgClass} from '@angular/common';
import {CollecteurService} from '../services/collecteur-service/collecteur.service';

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

  readonly STATUS = {
    EN_ATTENTE: 'en attente',
    OCCUPEE: 'occupee',
    EN_COURS: 'en cours',
    VALIDEE: 'validee',
    REJETEE: 'rejetee'
  } as const;

  constructor(
    private store: Store,
    private http: HttpClient,
    private collecteurService: CollecteurService
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userLocation = currentUser.address;

    this.requests$ = this.store.select(selectFilteredRequests(this.userLocation));
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(CollectorActions.loadRequests({userLocation: this.userLocation}));
  }

  getWasteTypes(wastes: any): string[] {
    return Object.keys(wastes).filter(type => wastes[type].selected);
  }

  calculatePoints(wastes: Record<string, WasteEntry>): number {
    let totalPoints = 0;
    for (const [type, entry] of Object.entries(wastes)) {
      if (entry.selected && entry.weight) {
        const pointsPerKg = POINTS_PER_KG[type as keyof typeof POINTS_PER_KG] || 0;
        totalPoints += (entry.weight / 1000) * pointsPerKg; // Convert grams to kg
      }
    }
    return totalPoints;
  }

  acceptRequest(request: CollectionRequest): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedRequest = {
      ...request,
      status: this.STATUS.OCCUPEE,
      collecteurId: currentUser.id
    };
    this.store.dispatch(CollectorActions.updateRequestStatus({request: updatedRequest}));
  }

  rejectRequest(request: CollectionRequest): void {
    const updatedRequest = {
      ...request,
      status: this.STATUS.REJETEE
    };
    this.store.dispatch(CollectorActions.updateRequestStatus({request: updatedRequest}));
  }

  validateCollection(request: CollectionRequest): void {
    const points = this.calculatePoints(request.wastes);
    const money = this.calculateMoney(points);

    this.collecteurService.validateCollectionAndUpdatePoints(request, points, money)
      .subscribe({
        next: ({ request: updatedRequest }) => {
          this.store.dispatch(CollectorActions.updateRequestStatus({ request: updatedRequest }));
        },
        error: (error) => console.error('Error in validation:', error)
      });
  }

  calculateMoney(points: number): number {
    let money = 0;

    if (points >= 500) {
      money += Math.floor(points / 500) * 350;
      points = points % 500;
    }

    if (points >= 200) {
      money += Math.floor(points / 200) * 120;
      points = points % 200;
    }

    if (points >= 100) {
      money += Math.floor(points / 100) * 50;
    }

    return money;
  }
}
