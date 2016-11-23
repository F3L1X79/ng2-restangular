import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RestangularModule } from 'ng2-restangular';
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        // Importing RestangularModule and making default configs for restanglar   
        RestangularModule.forRoot((RestangularProvider) => {
            RestangularProvider.setBaseUrl('http://0.0.0.0:3011/api/');
//            RestangularProvider.setRestangularFields({
//                id: "_id"
//            });
        }
        )
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }