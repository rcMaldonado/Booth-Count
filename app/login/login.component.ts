import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as localStorage from "nativescript-localstorage";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';

import { Vendor } from "../objects/vendor";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    private database: any;
    public vendor: Array<Vendor>;
    public loginCode: String;
    public salesId: Number = 1;
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: RouterExtensions) {
        (new Sqlite("booth.db")).then(db => {
            this.database = db;
            console.log("Success");
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    ngOnInit(): void {
    }

    public goToPrincipal() {
        if (this.loginCode !== undefined) {
            this.fetch();
        } else {
            let title = 'Oops 😅';
            let message = 'Entre el código de seguridad para continuar';
            let buttonTitle = 'OK';
            TNSFancyAlert.showWarning(title, message,buttonTitle);
        }
    }

    public goToRegister() {
        this.router.navigate(["register"])
    }

    public fetch() {
        this.database.all("SELECT * FROM vendor WHERE loginCode=" + this.loginCode).then(rows => {
            this.vendor = [];
            console.log(rows.length);
            for (var row in rows) {
                this.vendor.push({
                    "vendorId": rows[row][0],
                    "name": rows[row][1],
                    "loginCode": rows[row][2],
                    "email": rows[row][3]
                });
            }
            this.validate(this.vendor);
        }, error => {
            TNSFancyAlert.showNotice('Cree una cuenta', ' No existen cuentas en este dispositivo, puede crear una presionando "Registrarme"', 'OK').then(() => {
                console.log("SELECT ERROR", error);
            });
        });
    }

    public validate(vendor) {
        if (vendor.length > 0) {
            if (this.loginCode === vendor[0].loginCode) {
                localStorage.setItem("vendor", vendor[0]);
                this.checkForSaleId();
                this.router.navigate(["main"], { clearHistory: true});
            } else {
                TNSFancyAlert.showError('Información Incorrecta', ' No existe un usuario con este código.', 'OK');
            }
        } else {
            TNSFancyAlert.showError('Información Incorrecta',' No existe un usuario con este código.','OK');
        }
    }

    public checkForSaleId(){
        if (localStorage.getItem("salesId") == null) {
            localStorage.setItem("salesId", this.salesId);
        }
    }
}