import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Data } from "../providers/data";
import * as localStorage from "nativescript-localstorage";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "orderDetails",
    moduleId: module.id,
    templateUrl: "./orderDetails.component.html",
    styleUrls: ["./orderDetails.component.css"]
})
export class OrderDetailsComponent implements OnInit {

    private database: any;
    public order: Array<any>;
    public orderId;
    public vendorId;
    public total;

    private name: String;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: RouterExtensions, private data: Data) {
        this.getOrderDetails();
        this.vendorId = localStorage.getItem("vendor").vendorId;
        this.name = localStorage.getItem("vendor").name;
    }

    ngOnInit(): void {
        this.orderId = this.data.id;
        this.getTotal();
    }

    public goBack() {
        this.router.back();
    }

    public getOrderDetails () {
        (new Sqlite("booth.db")).then(db => {
            let query = "SELECT inventory.productCode, inventory.productName, sales.quantityToSale, inventory.productPrice, sales.priceSum FROM orders, sales, inventory, vendor WHERE orders.salesId = sales.salesId AND sales.vendorId = " + this.vendorId + " AND orders.orderId = " + this.data.id + " AND inventory.id = sales.productId";
            db.all(query).then( rows => {
                this.database = db;
                this.order = [];
                for (var row in rows) {
                    this.order.push({
                        "productCode": rows[row][0],
                        "productName": rows[row][1],
                        "quantity": rows[row][2],
                        "productPrice": rows[row][3],
                        "priceSum": rows[row][4],
                    });
                }
                console.log(this.order)
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public getTotal() {
        this.database.all("SELECT totalPrice FROM orders WHERE orderId = " + this.data.id).then( rows => {
            for(var row in rows) {
                this.total = rows[row][0];
                console.log(this.total);
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
}