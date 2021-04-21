import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DessertOnSale } from 'src/app/viewModels/dessert-on-sale';
import { AddDessertInput, GetAllOnSaleDessertsOutput } from 'src/app/models/dessert';
import { map } from 'rxjs/operators';
import { DessertMapper } from 'src/app/mappers/desserts-mapper';

@Injectable()
export class DessertService {

  constructor(
    private readonly http: HttpClient
  ) {
    //
  }

  public getAllOnSale(): Observable<DessertOnSale[]> {
    return this.http.get<GetAllOnSaleDessertsOutput>("desserts/allonsale").pipe(
      map<GetAllOnSaleDessertsOutput, DessertOnSale[]>((res) => {
        return res.onSaleDesserts.map(x => DessertMapper.toDessertOnSale(x));
      })
    );
  }

  public addDessert(input: AddDessertInput): Observable<object> {
    return this.http.post("desserts/add", input);
  }
}
