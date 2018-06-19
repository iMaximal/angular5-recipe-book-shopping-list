import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { FIREBASE_DB } from '../keys';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
             ) {
  }

  storeRecipes() {
    // return this.httpClient.put(
    //   `${FIREBASE_DB}/recipes.json`,
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token),
    //   }
    // );

    const req = new HttpRequest(
      'PUT',
      `${FIREBASE_DB}/recipes.json`,
      this.recipeService.getRecipes(),
      {
        reportProgress: true,
      }
    );

    return this.httpClient.request(req);
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>(`${FIREBASE_DB}/recipes.json`)
      .map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
