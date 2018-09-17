import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

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

// const routes: Routes = [
//     { path: "", redirectTo: "/items", pathMatch: "full" },
//     { path: "items", component: ItemsComponent },
//     { path: "item/:id", component: ItemDetailComponent },
// ];

const routes: Routes = [
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "main", component: MainComponent},
    {path: "settings", component: SettingsComponent},
    {path: "inventario", component: InventarioComponent},
    {path: "ordenes", component: OrdenesComponent},
    {path: "register", component: RegisterComponent},
    {path: "add-product", component: AddProductComponent},
    {path: "bag", component: BagComponent},
    {path: "modal", component: ModalComponent},
    {path: "total", component: TotalModalComponent},
    {path: "confirm", component: ConfirmComponent},
    {path: "orderDetails", component: OrderDetailsComponent},
    {path: "about", component: AboutComponent}
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }