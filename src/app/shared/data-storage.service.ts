import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { FIREBASE_DB } from '../keys';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(`${FIREBASE_DB}/recipes.json`, this.recipeService.getRecipes());
  }
}
