import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from 'src/app/http-interceptor';
import { DessertService } from 'src/app/services/dessert.service';
import { BackofficeGuard } from 'src/app/pages/backoffice/backoffice.guard';
import { MessageService } from './services/message.service';
import { IngredientsService } from './services/ingredients.service';

export function initialize(ingredientsSvc: IngredientsService) {
  return async (): Promise<any> => {
    await ingredientsSvc.loadIngredients();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    DessertService,
    BackofficeGuard,
    MessageService,
    IngredientsService,
    { provide: APP_INITIALIZER, useFactory: initialize, deps: [IngredientsService], multi: true},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
