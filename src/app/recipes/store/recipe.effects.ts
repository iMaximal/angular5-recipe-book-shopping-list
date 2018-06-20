import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import { FIREBASE_DB } from '../../keys';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap(
      (action: RecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>(`${FIREBASE_DB}/recipes.json`);
      })
    .map(
      (recipes) => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
