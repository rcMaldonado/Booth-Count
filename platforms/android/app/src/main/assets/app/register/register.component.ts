import { Component, OnInit } from "@angular/core";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import { RouterExtensions } from "nativescript-angular/router";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "register",
    moduleId: module.id,
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

    private database: any;
    public vendor: Array<any>;

    public name: String;
    public loginCode: String;
    public email: String;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: RouterExtensions) {
        this.vendor = [];
        (new Sqlite("booth.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS vendor(vendorId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, loginCode TEXT, email TEXT)").then(id => {
                this.database = db;
                console.log("Success");
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
     }

    ngOnInit(): void {
        this.fetch();
    }

    public register() {
        if (this.validate()){

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
                if (this.vendor.length > 0) {
                    let title = "Código Invalido";
                    let message = "El código entrado no es valido por favor use otro código";
                    let buttonTitle = "OK";
                    TNSFancyAlert.showError(title, message, buttonTitle);
                } else {
                    this.database.execSQL("INSERT INTO vendor (name, loginCode, email) VALUES (?, ?, ?)", [this.name, this.loginCode, this.email]).then(id => {
                        let title = '¡Felicidades! 🎉';
                        let message = this.name + " tu cuenta ha sido creada exitosamente. Entra tu código en la pantalla de inicio para acceder a tu cuenta.";
                        let buttonTitle = "OK";
                        TNSFancyAlert.showSuccess(title, message, buttonTitle).then(() => {
                            this.router.navigate(["login"], { clearHistory: true});
                        });
                    }, error => {
                        console.log("INSERT ERROR", error);
                    });
                }
            }, error => {
                TNSFancyAlert.showError('Información Incorrecta', ' No existe un usuario con este código.', 'OK').then(() => {
                    console.log("SELECT ERROR", error);
                });
            });
        } else {
            let title = 'Oops 😅';
            let message = 'Llene los campos para registrarse.';
            let buttonTitle = 'OK';
            TNSFancyAlert.showWarning(title, message, buttonTitle);
        }
    }

    public validate(): Boolean {
        let flag: Boolean;

        if (this.name === undefined || this.loginCode === undefined || this.email === undefined){
            flag = false;
        } else {
            flag = true
        }

        return flag;
    }

    public fetch() {
        this.database.all("SELECT * FROM vendor").then(rows => {
            this.vendor = [];
            for (var row in rows) {
                this.vendor.push({
                    "vendorId": rows[row][0],
                    "name": rows[row][1],
                    "loginCode": rows[row][2],
                    "email": rows[row][3]
                });
            }
            console.log(this.vendor);
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    public goBack() {
        this.router.back();
    }
}