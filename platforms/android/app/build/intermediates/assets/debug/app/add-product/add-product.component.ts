import { Component, OnInit } from "@angular/core";

import { RouterExtensions } from "nativescript-angular/router";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';

import { Inventory } from "../objects/inventory/inventory";
import { ProductDetails } from "../providers/productDetails/productDetails";

import * as Toast from "nativescript-toasts";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "add-product",
    moduleId: module.id,
    templateUrl: "./add-product.component.html",
    styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {

    private database: any;
    
    public inventory: Array<Inventory>;

    public productCode: String;
    public productName: String;
    public productCategory: String;
    public productPrice: number;
    public initialBalance: Number;

    public actionBarTitle: String;
    public selectedIndex: number;
    public btnText: String;

    public products = ["Alimentos", "Abonos Granulares", "Abonos Solubles", "Reventa"];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: RouterExtensions, private pd: ProductDetails) {
        (new Sqlite("booth.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS inventory(id INTEGER PRIMARY KEY AUTOINCREMENT, productCode TEXT, productName TEXT, productCategory TEXT, productPrice TEXT, initialBalance INTEGER, balance INTEGER, isVisible INTEGER)").then(id => {
                this.database = db;
                console.log("Success");
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
        // this.deleteInventory();

        this.prepareView();
    }

    ngOnInit(): void {
    }

    public goBack() {
        this.router.back();
    }

    public onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);

        this.productCategory = this.products[args.newIndex];
    }

    public onopen() {
        console.log("Drop Down opened.");
    }

    public onclose() {
        console.log("Drop Down closed.");
    }

    public addProduct() {
        if(this.actionBarTitle === "Editar Producto"){
            this.updateProduct();
        } else {
            if (this.validate()) {

                this.database.all("SELECT * FROM inventory WHERE productCode=" + this.productCode).then(rows => {
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
                            "isVisible": rows[row][7]
                        });
                    }
                    console.log(this.inventory);
                    if (this.inventory.length > 0) {
                        let title = 'Producto Existente';
                        let message = "El producto que esta entrando existe. Escriba el código del producto en la "
                            + "barra de busqueda en la sección de inventario";
                        let buttonTitle = 'OK';
                        TNSFancyAlert.showNotice(title, message, buttonTitle).then(() => {
                            this.router.navigate(["inventario"], { clearHistory: true });
                        });
                    } else {
                        this.database.execSQL("INSERT INTO inventory (productCode, productName, productCategory, productPrice, initialBalance, balance, isVisible) VALUES (?, ?, ?, ?, ?, ?, ?)",
                            [this.productCode, this.productName, this.productCategory, this.productPrice, this.initialBalance, this.initialBalance, 0]).then(() => {

                                let title = "Producto Añadido";
                                let message = "El producto ha sido añadido exitosamente. Si necesita editar su información lo puede hacer en " +
                                    "la sección de inventario. Para vender el producto busquelo en la sección de ventas.";
                                let buttonTitle = "OK";
                                TNSFancyAlert.showSuccess(title, message, buttonTitle).then(() => {
                                    this.router.navigate(["inventario"], { clearHistory: true });
                                });

                            }, error => {
                                console.log("INSERT ERROR", error);
                            });
                    }
                }, error => {
                    // let title = 'Producto No Existe 😔';
                    // let message = 'No existe un producto con este código.';
                    // let buttonTitle = 'OK';
                    // TNSFancyAlert.showNotice(title, message, buttonTitle).then(() => {
                    console.log("SELECT ERROR", error);
                    // });
                });

            } else {
                let title = 'Oops 😅';
                let message = 'Favor de llenar los campos para añadir el producto.';
                let buttonTitle = 'OK';
                TNSFancyAlert.showWarning(title, message, buttonTitle);
            }
        }
    }

    public validate(): Boolean {
        let flag: Boolean;

        if (this.productCode === undefined || this.productName === undefined ||
            this.productCategory === undefined || this.productPrice === undefined ||
            this.initialBalance === undefined) {
            flag = false;
        } else {
            flag = true;
        }

        return flag;
    }

    public prepareView() {
        if(this.pd.title === "Añadir Producto"){
            this.actionBarTitle = this.pd.title;
            this.selectedIndex = 0;
            this.btnText = "Añadir"
        } else if(this.pd.title === "Editar Producto") {

            this.actionBarTitle = this.pd.title
            this.productCode = this.pd.productDetails.productCode;
            this.productName = this.pd.productDetails.productName;
            this.productPrice = this.pd.productDetails.productPrice;
            this.initialBalance = this.pd.productDetails.initialBalance;
            this.btnText = "Editar";
            for(var i = 0; i < this.products.length; i++){
                if(this.products[i] === this.pd.productDetails.productCategory){
                    this.selectedIndex = i;
                    this.productCategory = this.products[this.selectedIndex];
                }
            }
        }
    }

    public updateProduct() {
        let query = "UPDATE inventory SET productCode = " + this.productCode + 
        ", productName='" + this.productName + "', productCategory='" + this.productCategory + 
        "', productPrice=" + this.productPrice + ", initialBalance=" + this.initialBalance +
        ", balance=" + this.initialBalance + " WHERE id=" + this.pd.productDetails.productId;
        this.database.execSQL(query).then ( () => {

            let message = "El " + this.productName + " fue actualizado exitosamente";
            let toastOptions: Toast.ToastOptions = { text: message, duration: Toast.DURATION.SHORT };
            Toast.show(toastOptions);
            this.router.navigate(["inventario"]);
        }, error => {
            console.log("UPDATE ERROR", error);
        });
    }

    public deleteInventory(){
        (new Sqlite("booth.db")).then(db => {
            db.execSQL("DROP TABLE inventory").then( () => {
                this.database = db;
                console.log("Success");
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }
}