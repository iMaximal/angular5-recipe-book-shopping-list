import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Пиво светлое', 'Традиционный напиток. Рецепт приготовления.', 'http://www.castlemalting.com/Publications/Recipes/Images/BelgianAmberBeer256x256.png'),
    new Recipe('Шашлык', 'Очень вкусный шашлык', 'http://trapeza-bis.ru/wp-content/uploads/2012/03/ujn2.jpeg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
