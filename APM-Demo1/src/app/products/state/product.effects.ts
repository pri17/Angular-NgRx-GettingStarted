import { Injectable } from "@angular/core";
import { ProductService } from "../product.service";
import { Actions, Effect, ofType} from '@ngrx/effects';
import { ProductActionTypes } from "./product.action";
import { mergeMap, map, catchError } from "rxjs/operators";
import { Product } from "../product";
import * as productActions from './product.action'
import { of } from "rxjs";

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productServie: ProductService){}
    

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productServie.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err=> of(new productActions.LoadFail(err)))
            ))
    )

}