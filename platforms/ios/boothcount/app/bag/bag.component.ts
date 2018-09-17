import { Component, OnInit, AfterViewInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import { ModalComponent } from "./bag.modal";
import { TotalModalComponent } from "./total.modal";

import * as Toast from 'nativescript-toasts';
import * as localStorage from "nativescript-localstorage";


var Sqlite = require("nativescript-sqlite");


@Component({
    selector: "bag",
    moduleId: module.id,
    templateUrl: "./bag.component.html",
    styleUrls: ["./bag.component.css"]
})
export class BagComponent implements AfterViewInit, OnInit {

    private database: any;
    public sales: Array<any>;
    public salesId: Number;

    public balance: Array<any>;
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: RouterExtensions, private modal: ModalDialogService, private vcRef: ViewContainerRef) {
        this.salesId = localStorage.getItem("salesId");
        this.getSales();
     }

    ngOnInit(): void {
    }

    ngAfterViewInit(){
        this.createOrders();
        console.log("SalesId is: ", this.salesId);

    }

    public goBack() {
        this.router.navigate(["main"], {clearHistory: true});
    }

    public onItemTap(args) {
        let index = args.index;
        let selectedItem = {
            "name": this.sales[index].productName,
            "quantity": this.sales[index].quantityToSale,
            "salesId": this.sales[index].salesId,
            "vendorId": this.sales[index].vendorId,
            "productId": this.sales[index].productId,
            "price": this.sales[index].price
        };

        let editModalOptions = {
            context: { details: selectedItem},
            fullscreen: false,
            viewContainerRef: this.vcRef,
        };

        this.modal.showModal(ModalComponent, editModalOptions).then(data => {
            if(data.response === "updated") {
                this.updateQuantityToSale(data.quantity, data.priceSum, data.salesId, data.vendorId, data.productId);
                this.getSales();
            } else if(data.response === "delete"){
                this.deleteSale(data.salesId, data.vendorId, data.productId);
                this.getSales();
            }
        });
    }

    public confirmSale() {
        let totalModalOptions = {
            context: { details: this.sales},
            fullscreen: false,
            viewContainerRef: this.vcRef,
        };

        this.modal.showModal(TotalModalComponent, totalModalOptions).then(data => {
            if(data.response === "confirm"){
                this.insertOrders(this.salesId, data.total);
            } else if(data.response === "delete") {
                this.emptyBag(this.salesId);
            } else if(data.response === "cancel"){

                let title = "No Hay Productos";
                let message = "Para hacer una orden el bolso de contener productos a vender";
                let buttonText = "OK";
                TNSFancyAlert.showWarning(title, message, buttonText).then(() => {
                    this.router.navigate(["main"]);
                });
                
            }
        });
    }

    public getSales() {
        (new Sqlite("booth.db")).then(db => {
            db.all("SELECT inventory.productCode, inventory.productName, sales.quantityToSale, inventory.productPrice, sales.priceSum, sales.salesId, sales.vendorId, sales.productId FROM sales, inventory WHERE sales.productId = inventory.id AND sales.salesId = " + this.salesId).then(rows => {
                this.sales = [];
                for (var row in rows) {
                    this.sales.push({
                        "productCode": rows[row][0],
                        "productName": rows[row][1],
                        "quantityToSale": rows[row][2],
                        "price": rows[row][3],
                        "priceSum": rows[row][4],
                        "salesId": rows[row][5],
                        "vendorId": rows[row][6],
                        "productId": rows[row][7]
                    });
                }
                console.log(this.sales);
                this.database = db;
            }, error => {
                console.log("SELECT ERROR", error);
            });
        });
    }

    public deleteSale(salesId, vendorId, productId) {
        this.database.execSQL("DELETE FROM sales WHERE salesId=" + salesId + " AND vendorId=" + vendorId + " AND productId=" + productId).then( () => {
            this.database.execSQL("UPDATE inventory SET isVisible=0 WHERE id=" + productId).then( () => {
                let message = 'El Producto fue removido del bolso de ventas';
                let toastOptions: Toast.ToastOptions = { text: message, duration: Toast.DURATION.SHORT };
                Toast.show(toastOptions);
            }, error => {
                console.log("UPDATE ERROR", error);
            });
        }, error => {
            console.log("DELETE ERROR: ", error);
        });
    }

    public updateQuantityToSale(quantity, priceSum, salesId, vendorId, productId) {
        this.database.execSQL("UPDATE sales SET quantityToSale=" + quantity + ", priceSum=" + priceSum + " WHERE (salesId=" + salesId + ") AND (vendorId=" + vendorId + ") AND (productId=" + productId + ")").then(() => {
            console.log("Cantidad a vendor actializada");
        }, error => {
            console.log("UPDATE ERROR", error);
        });
    }

    public emptyBag(salesId) {
        this.database.execSQL("DELETE FROM sales WHERE salesId=" + salesId).then(() => {
            this.database.execSQL("UPDATE inventory SET isVisible=0").then(() => {

                let message = 'El Bolso de Ventas fue vaciado';
                let toastOptions: Toast.ToastOptions = { text: message, duration: Toast.DURATION.SHORT };
                Toast.show(toastOptions);

                this.router.navigate(["main"]);
            }, error => {
                console.log("UPDATE ERROR", error);
            });
        }, error => {
            console.log("DELETE ERROR: ", error);
        });
    }

    public createOrders() {
        this.database.execSQL("CREATE TABLE IF NOT EXISTS orders(orderId INTEGER PRIMARY KEY AUTOINCREMENT, salesId INTEGER, totalPrice TEXT, FOREIGN KEY (salesId) REFERENCES sales(salesId) ON UPDATE CASCADE ON DELETE CASCADE)").then( () => {
            console.log("Success on creating orders");
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }

    public insertOrders(salesId, total) {
        this.database.execSQL("INSERT INTO orders (salesId, totalPrice) VALUES (?, ?)", [salesId, total]).then ( () => {
            this.updateBalance();
            this.router.navigate(["confirm"]);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    public updateBalance() {
        this.database.all("SELECT inventory.id, inventory.balance, sales.quantityToSale FROM sales, inventory WHERE sales.productId = inventory.id AND salesId = " + this.salesId).then(rows => {
            this.balance = [];
            for (var row in rows) {
                this.balance.push({
                    "productId": rows[row][0],
                    "productBalance": rows[row][1],
                    "quantityToReduce": rows[row][2]
                });
            }
            for(var i = 0; i < this.balance.length; i++){
                let newBalance = +(this.balance[i].productBalance - this.balance[i].quantityToReduce);
                this.database.execSQL("UPDATE inventory SET balance="  + newBalance + " WHERE id=" + this.balance[i].productId).then(() => {
                    console.log("Balance actualizado");
                }, error => {
                    console.log("UPDATE ERROR", error);
                });
            }
            console.log(this.balance);
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
}