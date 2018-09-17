import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import * as localStorage from "nativescript-localstorage";
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "confirm",
    moduleId: module.id,
    templateUrl: "./confirm.component.html",
    styleUrls: ["./confirm.component.css"]
})
export class ConfirmComponent implements OnInit {
    private database: any;
    public salesId: number;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: RouterExtensions) {
        this.salesId = localStorage.getItem("salesId");
     }

    ngOnInit(): void {
        this.salesId += 1;
        localStorage.setItem("salesId", this.salesId);
    }

    public finishSale() {
        this.resetIsVisible();
    }

    public resetIsVisible() {
        (new Sqlite("booth.db")).then(db => {
            db.execSQL("UPDATE inventory SET isVisible=0 WHERE isVisible=1").then( () => {
                this.database = db;
                // this.updateBalance();
                this.router.navigate(["main"], { clearHistory: true });
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }
}