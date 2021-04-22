import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DessertService } from 'src/app/services/dessert.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Dessert } from 'src/app/viewModels/dessert';
import { Ingredient } from 'src/app/viewModels/ingredients';

@Component({
  selector: 'app-dessert-tab',
  templateUrl: './dessert-tab.component.html',
  styleUrls: ['./dessert-tab.component.scss']
})
export class DessertTabComponent implements OnInit {

  public form: FormGroup;
  public editForm: FormGroup = null;

  public ingredients: Ingredient[] = [];
  public desserts: Dessert[] = [];

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

    if (this.ingredientsSvc.ingredients.value.length === 0) {
      this.ingredientsSvc.loadIngredients();
    }

    this.dessertSvc.desserts.subscribe((newDesserts) => {
      this.desserts = newDesserts;
    });
    this.dessertSvc.loadAll();
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
    this.form.reset({
      price: 0
    });
    (this.form.controls.ingredients as FormArray).controls = [
      this.getFormControlForIngredient()
    ];
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

  deleteDessert(dessert: Dessert): void {
    this.dessertSvc.deleteDessert(dessert.id);
  }

  editDessert(dessert: Dessert): void {
    this.editForm =  new FormGroup({
      id: new FormControl(dessert.id, Validators.required),
      name: new FormControl(dessert.name, Validators.required),
      price: new FormControl(0, [Validators.required, Validators.pattern(/\d+/g)]),
    });
  }

  cancelEdit(): void {
    this.editForm = null;
  }

  saveDessert(): void {
    this.dessertSvc.updateDessert(this.editForm.value).subscribe(() => {
      this.editForm = null;
    });
  }

  private getFormControlForIngredient(): FormGroup {
    return new FormGroup({
      ingredientId: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/\d+/g)]),
      unit: new FormControl(null, Validators.required)
    });
  }
}
