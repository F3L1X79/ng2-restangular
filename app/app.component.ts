import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Restangular } from 'ng2-restangular';

@Component({
    selector: 'my-map-app',
    template: '<h1>Hello</h1>'
})
export class AppComponent implements OnInit, AfterViewInit {
    
    //remove this line...
    constructor(private restangular: Restangular) {
    }

    ngOnInit(): void {
         //and this one to make it work
        this.restangular.all('Annotations').getList().toPromise().then(function(annotations) {
            console.log(annotations);
        });
    }

    ngAfterViewInit(): void {

    }

}