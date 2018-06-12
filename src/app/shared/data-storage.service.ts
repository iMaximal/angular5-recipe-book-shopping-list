import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { FIREBASE_DB } from '../keys';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(`${FIREBASE_DB}/recipes.json`, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    this.http.get(`${FIREBASE_DB}/recipes.json`)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
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
