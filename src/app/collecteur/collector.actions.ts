import {createActionGroup, props} from '@ngrx/store';
import {CollectionRequest} from '../interfaces/collection-request.interface';

export const CollectorActions = createActionGroup({
  source: 'Collector',
  events: {
    'Load Requests': props<{ userLocation: string }>(),
    'Load Requests Success': props<{ requests: CollectionRequest[] }>(),
    'Load Requests Failure': props<{ error: string }>(),

    'Update Request Status': props<{ request: CollectionRequest }>(),
    'Update Request Status Success': props<{ request: CollectionRequest }>(),
    'Update Request Status Failure': props<{ error: string }>(),
  }
});
