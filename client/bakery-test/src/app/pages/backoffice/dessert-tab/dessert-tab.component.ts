import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DessertService } from 'src/app/services/dessert.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/viewModels/ingredients';

@Component({
  selector: 'app-dessert-tab',
  templateUrl: './dessert-tab.component.html',
  styleUrls: ['./dessert-tab.component.scss']
})
export class DessertTabComponent implements OnInit {

  public form: FormGroup;

  public ingredients: Ingredient[] = [];

  public loadingAdd = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ingredientsSvc: IngredientsService,
    private readonly dessertSvc: DessertService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, Validators.required),
      price: new FormControl(0, [Validators.required, Validators.pattern(/\d+/g)]),
      ingredients: this.formBuilder.array([
        this.getFormControlForIngredient()
      ])
    });
  }

  ngOnInit(): void {
    this.ingredientsSvc.ingredients.subscribe((newIngredients) => {
      this.ingredients = newIngredients;
    });
  }

  onSubmitNewDessert(): void {
    this.form.disable();
    this.loadingAdd = true;
    this.dessertSvc.addDessert(this.form.value).subscribe(
      () => {
        this.form.enable();
        this.loadingAdd = false;
        this.clearForm();
      },
      () => {
        this.form.enable();
        this.loadingAdd = false;
      }
    );
  }

  clearForm(): void {
    (this.form.controls.ingredients as FormArray).controls = [
      this.getFormControlForIngredient()
    ];
    this.form.reset({
      price: 0
    });
  }

  addIngredient(): void {
    const control = this.form.controls.ingredients as FormArray;
    control.push(this.getFormControlForIngredient());
  }

  removeIngredient(index: number): void {
    const control = this.form.controls.ingredients as FormArray;
    control.removeAt(index);
  }

  getControls(): AbstractControl[] {
    return (this.form.controls.ingredients as FormArray).controls;
  }

  private getFormControlForIngredient(): FormGroup {
    return new FormGroup({
      ingredientId: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/\d+/g)]),
      unit: new FormControl(null, Validators.required)
    });
  }
}
