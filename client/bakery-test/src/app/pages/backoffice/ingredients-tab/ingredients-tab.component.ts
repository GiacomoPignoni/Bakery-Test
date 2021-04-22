import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/viewModels/ingredients';

@Component({
  selector: 'app-ingredients-tab',
  templateUrl: './ingredients-tab.component.html',
  styleUrls: ['./ingredients-tab.component.scss']
})
export class IngredientsTabComponent implements OnInit {

  public loading = false;

  public form: FormGroup;

  public ingredients: Ingredient[] = [];

  constructor(
    private ingredientSvc: IngredientsService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.ingredientSvc.ingredients.subscribe((newIngredients) => {
      this.ingredients = newIngredients;
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.ingredientSvc.addIngredient(this.form.value).subscribe(
      () => {
        this.loading = false;
        this.form.reset();
      },
      () => {
        this.loading = false;
      }
    );
  }

  delete(ingredient: Ingredient): void {
    this.ingredientSvc.delete(ingredient.id);
  }
}
