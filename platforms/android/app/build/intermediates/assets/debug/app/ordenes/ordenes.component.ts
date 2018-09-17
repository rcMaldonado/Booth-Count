import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Router } from '@angular/router';
import { Data } from "../providers/data";

import * as localStorage from "nativescript-localstorage";

var Sqlite = require("nativescript-sqlite");


@Component({
    selector: "ordenes",
    moduleId: module.id,
    templateUrl: "./ordenes.component.html",
    styleUrls: ["./ordenes.component.css"]
})
export class OrdenesComponent implements AfterViewInit, OnInit {

    private database: any;
    private orders: Array<any> = [];
    private sales: Array<any> = [];
    private vendorId;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private _changeDetectionRef: ChangeDetectorRef, private router: Router, private data: Data) {
        this.createOrders();
        this.vendorId = localStorage.getItem("vendor").vendorId;
    }

    ngOnInit(): void {
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();

        this.getOrders();
        console.log("-----------------------------------------------------------");
        this.getSales();
    }

    public createOrders() {
        (new Sqlite("booth.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS orders(orderId INTEGER PRIMARY KEY AUTOINCREMENT, salesId INTEGER, totalPrice TEXT, FOREIGN KEY (salesId) REFERENCES sales(salesId) ON UPDATE CASCADE ON DELETE CASCADE)").then(() => {
                this.database = db;
                console.log("Success updating db");
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public getOrders() {
        this.database.all("SELECT orders.orderId, orders.salesId, orders.totalPrice FROM orders, sales WHERE sales.vendorId = " + this.vendorId + " GROUP BY orderId ORDER BY orderId DESC").then(rows => {
            this.orders = [];
            for (var row in rows) {
                this.orders.push({
                    "orderId": rows[row][0],
                    "salesId": rows[row][1],
                    "total": rows[row][2]
                });
            }
            console.log(this.orders);
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    public getSales() {
        this.database.all("SELECT * FROM sales").then(rows => {
            this.sales = [];
            for (var row in rows) {
                this.sales.push({
                    "salesId": rows[row][0],
                    "vendorId": rows[row][1],
                    "productId": rows[row][2],
                    "quantityToSale": rows[row][3],
                    "priceSum": rows[row][4]
                });
            }
            console.log(this.sales);
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    public onItemTap(args) {
        let index = args.index;
        this.data.id = this.orders[index].orderId
        this.router.navigate(["orderDetails"], {});
    }

    public toInicio() {
        this.router.navigate(['main']);
    }

    public toInventario() {
        this.router.navigate(['inventario']);
    }

    public toOrdenes() {
        this.router.navigate(['ordenes'])
    }

    public toAjustes() {
        this.router.navigate(['settings']);
    }
}