import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { SearchBar } from "ui/search-bar";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as application from "application";
import * as localStorage from "nativescript-localstorage";
import { RouterExtensions } from "nativescript-angular/router";

import { Inventory } from "../objects/inventory/inventory";
import { TNSFancyAlert } from "nativescript-fancyalert";

import { ProductDetails } from "../providers/productDetails/productDetails";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "inventario",
    moduleId: module.id,
    templateUrl: "./inventario.component.html",
    styleUrls: ["inventario.component.css"]
})
export class InventarioComponent implements AfterViewInit, OnInit {

    private database: any;
    public inventory: Array<Inventory>;
    private name: String;

    public searchCode: String;

    public isAndroid: boolean;
    public isIos: boolean;

    public arrayLength;

    constructor(private _changeDetectionRef: ChangeDetectorRef, private router: RouterExtensions, private page: Page, private pd: ProductDetails) {
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
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.name = localStorage.getItem("vendor").name;
        this.fetch();
        if (application.ios) {
            this.isAndroid = false;
            this.isIos = true;
        } else if (application.android) {
            this.isAndroid = true;
            this.isIos = false;
        }
    }

    public loadSearchBar(event){
        if(this.page.android){
            event.object.android.clearFocus();
        }
    }

    public onSubmit(args) {

        if (this.validate()) {
            this.database.all("SELECT * FROM inventory WHERE productCode=" + this.searchCode).then(rows => {
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
            }, error => {
                let title = 'Producto No Existe 😔';
                let message = 'No existe un producto con este código.';
                let buttonTitle = 'OK';
                TNSFancyAlert.showNotice(title, message, buttonTitle).then( () => {
                    console.log("SELECT ERROR", error);
                });
            });

        }

        let searchBar = <SearchBar>args.object;
        searchBar.dismissSoftInput();
    }

    public onClear(args) {
        this.fetch();
        let searchBar = <SearchBar>args.object;
        searchBar.dismissSoftInput();
    }

    public validate(): Boolean {
        let flag: Boolean;

        if (this.searchCode !== undefined){

            flag = true

        } else {
            let title = 'Oops 😅';
            let message = 'Entre el código de un producto para filtrar la busqueda';
            let buttonTitle = 'OK';
            TNSFancyAlert.showNotice(title, message, buttonTitle);

            flag = false;
        }

        return flag
    }

    public addItem() {
        this.pd.title = "Añadir Producto"
        this.router.navigate(['add-product']);
    }

    public onItemTap(args) {
        let index = args.index;
        this.pd.title = "Editar Producto";
        this.pd.productDetails = {
            "productId": this.inventory[index].productId,
            "productCode": this.inventory[index].productCode,
            "productName": this.inventory[index].productName,
            "productCategory": this.inventory[index].productCategory,
            "productPrice": this.inventory[index].productPrice,
            "initialBalance": this.inventory[index].initialBalance,
        };
        this.router.navigate(['add-product']);
        console.log("Item Tapped at cell index: " + args.index);
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
                    "isVisible": rows[row][7]
                });
            }
            this.arrayLength = this.inventory.length;
            console.log(this.inventory);
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    //MARK: Side Drawer Methods
    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }


    public toInicio() {
        this.router.navigate(['main'], {clearHistory: true});
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
        this.router.navigate(["about"], { clearHistory: true });
    }
}