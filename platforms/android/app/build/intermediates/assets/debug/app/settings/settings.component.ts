import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { knownFolders, File, Folder } from "file-system";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as localStorage from "nativescript-localstorage";
import * as email from "nativescript-email";
import { Router } from "@angular/router";

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

    public folderName: string = "testFolder";
    public fileName: string = "testFile";
    public fileTextContent: string;

    public successMessage: string;
    public writtenContent: string;
    public isItemVisible: boolean = false;

    public file: File;
    public folder: Folder;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private _changeDetectionRef: ChangeDetectorRef, private router: Router) {
        this.vendor = localStorage.getItem("vendor");
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
            body: "Hello World"
        }
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
        this.onCreateFile();
    }

    public onCreateFile() {
        // >> fs-create-all-code
        let documents = knownFolders.documents();
        this.folder = documents.getFolder(this.folderName || "testFolder");
        this.file = this.folder.getFile((this.fileName || "testFile") + ".txt");

        this.file.writeText(this.fileTextContent || "some random content")
            .then(result => {
                console.log("El resultado es: ", result);
                this.file.readText()
                    .then(res => {
                        this.successMessage = "Successfully saved in " + this.file.path;
                        this.writtenContent = res;
                        this.isItemVisible = true;
                    });
            }).catch(err => {
                console.log(err);
            });
        // << fs-create-all-code
    }

    public generateReport() {
        
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

    private logout() {
        this.router.navigate(['login']);
    }
}