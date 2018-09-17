import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";


@Component({
    selector: "about",
    moduleId: module.id,
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit, AfterViewInit {

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private _changeDetectionRef: ChangeDetectorRef, private router: RouterExtensions) { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

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
        this.router.navigate(['about'], { clearHistory: true});
    }

}