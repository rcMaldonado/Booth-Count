import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { DropDownModule } from "nativescript-drop-down/angular";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { SettingsComponent } from "./settings/settings.component";
import { InventarioComponent } from "./inventario/inventario.component";
import { OrdenesComponent } from "./ordenes/ordenes.component";
import { RegisterComponent } from "./register/register.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { BagComponent } from "./bag/bag.component";
import { ModalComponent } from "./bag/bag.modal";
import { TotalModalComponent } from "./bag/total.modal";
import { ConfirmComponent } from "./confirm/confirm.component";
import { OrderDetailsComponent } from "./orderDetails/orderDetails.component";
import { AboutComponent } from "./about/about.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { Data } from "./providers/data";
import { ProductDetails } from "./providers/productDetails/productDetails";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        DropDownModule, 
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        SettingsComponent,
        InventarioComponent,
        OrdenesComponent,
        RegisterComponent,
        AddProductComponent,
        BagComponent,
        ModalComponent,
        TotalModalComponent,
        ConfirmComponent,
        OrderDetailsComponent,
        AboutComponent
    ],
    entryComponents: [ ModalComponent, TotalModalComponent],
    providers: [
        ModalDialogService,
        Data,
        ProductDetails
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
