import { createReducer, on } from '@ngrx/store';
import { CollectionRequest } from '../interfaces/collection-request.interface';
import { CollectorActions } from './collector.actions';

export interface CollectorState {
  requests: CollectionRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: CollectorState = {
  requests: [],
  loading: false,
  error: null
};

export const collectorReducer = createReducer(
  initialState,
  on(CollectorActions.loadRequests, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CollectorActions.loadRequestsSuccess, (state, { requests }) => ({
    ...state,
    requests,
    loading: false
  })),
  on(CollectorActions.loadRequestsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(CollectorActions.updateRequestStatus, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CollectorActions.updateRequestStatusSuccess, (state, { request }) => ({
    ...state,
    requests: state.requests.map(req =>
      req.id === request.id ? request : req
    ),
    loading: false
  })),
  on(CollectorActions.updateRequestStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
