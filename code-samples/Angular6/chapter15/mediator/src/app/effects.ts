import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SEARCH, SearchAction, SearchSuccessAction} from './actions';
import {ProductService} from './product.service';

@Injectable()
export class SearchEffects {

  @Effect()
  loadProducts$ = this.actions$
    .pipe(
      ofType(SEARCH),
      map((action: SearchAction) => action.payload),
      switchMap(({ searchQuery }) => this.productService.getProducts(searchQuery)),
      map(searchResults => new SearchSuccessAction({searchResults}))
    );

  constructor(private actions$: Actions,
              private productService: ProductService) {}
}
