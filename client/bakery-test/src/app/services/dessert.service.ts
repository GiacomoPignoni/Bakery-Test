import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DessertOnSale } from 'src/app/viewModels/dessert-on-sale';
import { AddDessertInput, GetAllDessertsOutput, GetAllOnSaleDessertsOutput, PutDessertOnSaleInput, UpdateDessertInput } from 'src/app/models/dessert';
import { map, tap } from 'rxjs/operators';
import { DessertMapper } from 'src/app/mappers/desserts-mapper';
import { Dessert } from '../viewModels/dessert';

@Injectable()
export class DessertService {

  public readonly desserts: BehaviorSubject<Dessert[]> = new BehaviorSubject([]);

  constructor(
    private readonly http: HttpClient
  ) {
    //
  }

  public loadAll(): void {
    this.http.get<GetAllDessertsOutput>("desserts/all").pipe(
      map<GetAllDessertsOutput, Dessert[]>((res) => {
        return res.desserts.map(x => DessertMapper.toDessert(x));
      })
    ).subscribe((newDesserts) => {
      this.desserts.next(newDesserts);
    });
  }

  public getAllOnSale(): Observable<DessertOnSale[]> {
    return this.http.get<GetAllOnSaleDessertsOutput>("desserts/allonsale").pipe(
      map<GetAllOnSaleDessertsOutput, DessertOnSale[]>((res) => {
        return res.onSaleDesserts.map(x => DessertMapper.toDessertOnSale(x));
      })
    );
  }

  public deleteDessert(id: number): void {
    this.http.delete<void>(`desserts/delete/${id}`).subscribe(() => {
      this.loadAll();
    });
  }

  public addDessert(input: AddDessertInput): Observable<void> {
    return this.http.post<void>("desserts/add", input).pipe(
      tap(() => {
        this.loadAll();
      })
    );
  }

  public updateDessert(input: UpdateDessertInput): Observable<void> {
    return this.http.put<void>("desserts/update", input).pipe(
      tap(() => {
        this.loadAll();
      })
    );
  }

  public putOnSale(input: PutDessertOnSaleInput): Observable<void> {
    return this.http.post<void>("desserts/putonsale", input);
  }
}
