import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as localStorage from "nativescript-localstorage";
import * as email from "nativescript-email";
import { RouterExtensions } from "nativescript-angular/router";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements AfterViewInit, OnInit {

    private vendor: any;
    private name: String
    private composeOptions: email.ComposeOptions;
    private report: string;
    private database: any;
    private inventory: Array<any>
    private reportInfo: Array<any> = [];
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private _changeDetectionRef: ChangeDetectorRef, private router: RouterExtensions) {
        this.vendor = localStorage.getItem("vendor");
        this.getReportInfo();
        this.generateReport();
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit(): void {
        this.name = this.vendor.name;
        this.composeOptions = {
            to: [this.vendor.email],
            subject: "Nativescript Email",
            body: this.report
        };
    }

    public sendEmail() {
        email.available().then(available => {
            console.log("Se puede por email:", available);
            if (available) {
                email.compose(this.composeOptions).then(result => {
                    console.log(result);
                });
            }
        });
    }

    public generateReport() {
        let tempString;
        this.report = "Reporte de: " + this.vendor.name + "\n\n"; 
        for(var i = 0; i < this.reportInfo.length; i++) {
                tempString = "Producto: " + this.reportInfo[i].productName + "\n" +
                "Precio: " + this.reportInfo[i].productPrice + "\n" +
                "Balance Inicial: " + this.reportInfo[i].initialBalance + "\n" +
                "Vendido: " + this.reportInfo[i].sold + "\n" +
                "Balance Final: " + this.reportInfo[i].finalBalance + "\n" +
                "Total en ventas: $" + this.reportInfo[i].totalSold + "\n\n";

            this.report += tempString;
        }
    }

    public getReportInfo() {
        (new Sqlite("booth.db")).then(db => {
            db.all("SELECT productName, productPrice, initialBalance, balance FROM inventory").then( rows => {
                this.inventory = [];
                for (var row in rows) {
                    this.inventory.push({
                        "productName": rows[row][0],
                        "productPrice": rows[row][1],
                        "initialBalance": rows[row][2],
                        "balance": rows[row][3]
                    });
                }
                // console.log(this.inventory);
                this.calculateReport();
                this.generateReport();
                this.database = db;
                console.log("Success updating db");
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public calculateReport() {
        for(var i = 0; i < this.inventory.length; i++){
            this.reportInfo.push({
                "productName": this.inventory[i].productName,
                "productPrice": this.inventory[i].productPrice,
                "initialBalance": this.inventory[i].initialBalance,
                "sold": (this.inventory[i].initialBalance - this.inventory[i].balance),
                "finalBalance": this.inventory[i].balance,
                "totalSold": (this.inventory[i].productPrice * (this.inventory[i].initialBalance - this.inventory[i].balance)) 
            });
        }
        console.log(this.reportInfo);
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
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

    public toAbout() {
        this.router.navigate(["about"]);
    }

    private logout() {
        this.router.navigate(['login'], {clearHistory: true});
    }
}