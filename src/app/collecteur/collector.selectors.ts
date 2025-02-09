import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectorState } from './collector.reducer';

export const selectCollectorState = createFeatureSelector<CollectorState>('collector');

export const selectAllRequests = createSelector(
  selectCollectorState,
  (state) => state.requests
);

export const selectFilteredRequests = (userLocation: string) => createSelector(
  selectAllRequests,
  (requests) => requests.filter(request =>
    request.address.includes(userLocation)
  )
);

export const selectLoading = createSelector(
  selectCollectorState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCollectorState,
  (state) => state.error
);
