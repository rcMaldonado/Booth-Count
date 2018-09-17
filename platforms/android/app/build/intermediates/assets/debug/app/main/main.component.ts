import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as localStorage from "nativescript-localstorage";
import * as Toast from 'nativescript-toasts';
import * as dialogs from "ui/dialogs";

import { Vendor } from "../objects/vendor";
import { Inventory } from "../objects/inventory/inventory";

var Sqlite = require("nativescript-sqlite");


@Component({
    moduleId: module.id,
    selector: "main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements AfterViewInit, OnInit {

    private database: any;

    public inventory: Array<Inventory>;
    public vendor: Vendor;
    public name: String;
    public sales: Array<any> = [];
    public salesId: Number;

    constructor(private _changeDetectionRef: ChangeDetectorRef, private router: RouterExtensions) {
        this.createInventory();
        this.createSales();
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();

    }

    ngOnInit() {
        this.vendor = localStorage.getItem("vendor");
        this.name = this.vendor.name;
        this.salesId = localStorage.getItem("salesId");
        this.fetch(); // Consigue todos los items del inventario (inventory table).
        this.getSales(); // Consigue todos los item de sales.
        console.log("SalesId is: ", this.salesId);
    }

    //Ejecutada cuando el usuario selecciona una celda.
    public onItemTap(args) {

        let index = args.index
        let selectedItem = {
            "productId": this.inventory[index].productId,
            "productCode": this.inventory[index].productCode,
            "productName": this.inventory[index].productName,
            "productCategory": this.inventory[index].productCategory,
            "productPrice": this.inventory[index].productPrice,
            "balance": this.inventory[index].balance,
            "quantity": 1
        }

        if (this.inventory[index].isVisible) {
            dialogs.confirm({
                title: "Eliminar del Bolso",
                message: "¿Desea eliminar el producto del bolso de compra?",
                okButtonText: "Si",
                cancelButtonText: "No"
            }).then(result => {
                if (result.valueOf()) {
                    this.inventory[index].isVisible = 0;
                    this.updateInventory(selectedItem.productId, this.inventory[index].isVisible, selectedItem.quantity, selectedItem.productPrice);
                }
            });
        } else {
            dialogs.prompt({
                title: "Cantidad a Vender",
                message: "Entre la cantidad de productos que desea vender.",
                okButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                defaultText: selectedItem.quantity.toString(),
                inputType: dialogs.inputType.text,
            }).then(result => {

                // console.log("Dialog result: " + result.result + ", text: " + result.text);

                if (isNaN(+result.text) || result.text === "" || result.text === undefined) {
                    dialogs.confirm({
                        title: "Entre un valor númerico",
                        message: "Favor de entrar un valor númerico para que el producto sea añadido al bolso de ventas.",
                        okButtonText: "OK",
                    })
                } else {
                    if (result.result) {
                        selectedItem.quantity = +result.text;
                        this.sales.push(selectedItem);
                        this.inventory[index].isVisible = 1;

                        //Se actualiza el inventario indicando que el producto es deseado
                        this.updateInventory(selectedItem.productId, this.inventory[index].isVisible, selectedItem.quantity, selectedItem.productPrice);
                        console.log(this.sales);
                    }
                }
            });
        }
    }

    public createInventory() {
        (new Sqlite("booth.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY AUTOINCREMENT, productCode TEXT, productName TEXT, productCategory TEXT, productPrice TEXT, initialBalance INTEGER, balance INTEGER, isVisible INTEGER)").then(id => {
                this.database = db;
                console.log("Success");
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public fetch() {
        this.database.all("SELECT * FROM inventory").then(rows => {
            this.inventory = [];
            for (var row in rows) {
                this.inventory.push({
                    "productId": rows[row][0],
                    "productCode": rows[row][1],
                    "productName": rows[row][2],
                    "productCategory": rows[row][3],
                    "productPrice": rows[row][4],
                    "initialBalance": rows[row][5],
                    "balance": rows[row][6],
                    "isVisible": rows[row][7],
                });
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    public updateInventory(id, isVisible, quantity, price) {
        this.database.execSQL("UPDATE inventory SET isVisible = " + isVisible + " WHERE id = " + id).then( () => {
            console.log("Inventario Actualizado");
            if (isVisible === 1) {
                let priceSum = this.getPriceSum(quantity, price);
                this.insertToSales(id, quantity, priceSum);
                this.getSales();
            } else {
                this.deleteSale(id);
                this.getSales();
            }
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    /* Se crea la tabla sales en donde se estara guardando la información
    de las ventas que se estan haciendo al momento. Estas se convertiran en orden
    en el bolso de ventas. Esta función es llamada en el constructor. */
    public createSales() {
        (new Sqlite("booth.db")).then(db => {
            let vendorId = "FOREIGN KEY (vendorId) REFERENCES vendor(vendorId) ON UPDATE CASCADE ON DELETE CASCADE, ";
            let productId = " FOREIGN KEY (productId) REFERENCES inventory(id) ON UPDATE CASCADE ON DELETE CASCADE, ";
            db.execSQL("CREATE TABLE IF NOT EXISTS sales (salesId INTEGER, vendorId INTEGER NOT NULL, productId INTEGER NOT NULL, quantityToSale INTEGER, priceSum  TEXT, " + vendorId + productId + " PRIMARY KEY (salesId, vendorId, productId))").then(id => {
                this.database = db;
                console.log("Success");
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public getSales() {
        this.database.all("SELECT * FROM sales WHERE sales.salesId = " + this.salesId).then(rows => {
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

    public insertToSales(productId, quantity, price) {
        this.database.execSQL("INSERT or IGNORE INTO sales (salesId, vendorId, productId, quantityToSale, priceSum) VALUES (?, ?, ?, ?, ?)",
            [this.salesId, this.vendor.vendorId, productId, quantity, price]).then(() => {
                let message = 'Producto añadido al bolso de ventas';
                let toastOptions: Toast.ToastOptions = { text: message, duration: Toast.DURATION.SHORT };
                Toast.show(toastOptions);

                this.getSales();
            }, error => {
                console.log("INSERT ERROR", error);
            });
    }

    public deleteSale(productId) {
        this.database.execSQL("DELETE FROM sales WHERE productId=" + productId, ).then(() => {
            let message = 'Producto eliminado del bolso de ventas';
            let toastOptions: Toast.ToastOptions = { text: message, duration: Toast.DURATION.SHORT };
            Toast.show(toastOptions);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    public getPriceSum(quantity, price): Number {
        let total = +quantity * +price;
        return total;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    public orderBag() {
        if (this.sales.length === 0) {
            let title = "No Hay Productos";
            let message = "No hay productos en el bolso de venta, favor de seleccionar un producto para producir una orden.";
            let buttonTitle = "OK";
            TNSFancyAlert.showWarning(title, message, buttonTitle);
        } else {
            this.router.navigate(["bag"]);
        }
    }

    public toInicio() {
        this.router.navigate(['main'], { clearHistory: true });
    }

    public toInventario() {
        this.router.navigate(['inventario'], { clearHistory: true });
    }

    public toOrdenes() {
        this.router.navigate(['ordenes'], { clearHistory: true })
    }

    public toAjustes() {
        this.router.navigate(['settings'], { clearHistory: true });
    }

    public toAbout() {
        this.router.navigate(["about"], { clearHistory: true});
    }
}