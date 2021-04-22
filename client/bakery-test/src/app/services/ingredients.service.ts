import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AddIngredientInput, Ingredient } from 'src/app/viewModels/ingredients';
import { IngredientsMapper } from '../mappers/ingredients-mapper';
import { GetAllIngredientsOutput } from '../models/ingredients';

@Injectable()
export class IngredientsService {

  public readonly ingredients: BehaviorSubject<Ingredient[]> = new BehaviorSubject([]);

  constructor(
    private readonly http: HttpClient
  ) {
    //
  }

  loadIngredients(): Promise<void> {
    return this.http.get<GetAllIngredientsOutput>("ingredients/all").pipe(
      map<GetAllIngredientsOutput, void>((res) => {
        const newIngredients = res.ingredients.map(x => IngredientsMapper.toIngredient(x));
        this.ingredients.next(newIngredients);
      }),
    ).toPromise();
  }

  addIngredient(input: AddIngredientInput): Observable<void> {
    return this.http.post<void>("ingredients/add", input).pipe(
      tap(() => {
        this.loadIngredients();
      })
    );
  }

  delete(id: number): void {
    this.http.delete<void>(`ingredients/delete/${id}`).subscribe(
     () => {
        this.loadIngredients();
     }
    );
  }
}
