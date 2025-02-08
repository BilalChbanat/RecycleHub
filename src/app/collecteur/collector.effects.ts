import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { CollectorActions } from './collector.actions';
import { CollecteurService } from '../services/collecteur-service/collecteur.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CollectorEffects {
  constructor(
    private actions$: Actions,
    private collecteurService: CollecteurService,
    private store: Store
  ) {
    this.handleLoadRequests();
    this.handleUpdateStatus();
  }

  private handleLoadRequests() {
    this.actions$.subscribe(action => {
      if (action.type === CollectorActions.loadRequests.type) {
        this.collecteurService.getRequests().subscribe({
          next: (requests) => {
            this.store.dispatch(CollectorActions.loadRequestsSuccess({ requests }));
          },
          error: (error) => {
            this.store.dispatch(CollectorActions.loadRequestsFailure({ error: error.message }));
          }
        });
      }
    });
  }

  private handleUpdateStatus() {
    this.actions$.subscribe(action => {
      if (action.type === CollectorActions.updateRequestStatus.type) {
        const updateAction = action as any; // Type assertion for accessing request property
        this.collecteurService.updateRequest(updateAction.request).subscribe({
          next: (updatedRequest) => {
            this.store.dispatch(CollectorActions.updateRequestStatusSuccess({ request: updatedRequest }));
          },
          error: (error) => {
            this.store.dispatch(CollectorActions.updateRequestStatusFailure({ error: error.message }));
          }
        });
      }
    });
  }
}
