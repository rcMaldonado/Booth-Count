"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("./login/login.component");
var main_component_1 = require("./main/main.component");
var settings_component_1 = require("./settings/settings.component");
var inventario_component_1 = require("./inventario/inventario.component");
var ordenes_component_1 = require("./ordenes/ordenes.component");
var register_component_1 = require("./register/register.component");
var add_product_component_1 = require("./add-product/add-product.component");
var bag_component_1 = require("./bag/bag.component");
var bag_modal_1 = require("./bag/bag.modal");
var total_modal_1 = require("./bag/total.modal");
var confirm_component_1 = require("./confirm/confirm.component");
var orderDetails_component_1 = require("./orderDetails/orderDetails.component");
var about_component_1 = require("./about/about.component");
// const routes: Routes = [
//     { path: "", redirectTo: "/items", pathMatch: "full" },
//     { path: "items", component: ItemsComponent },
//     { path: "item/:id", component: ItemDetailComponent },
// ];
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "main", component: main_component_1.MainComponent },
    { path: "settings", component: settings_component_1.SettingsComponent },
    { path: "inventario", component: inventario_component_1.InventarioComponent },
    { path: "ordenes", component: ordenes_component_1.OrdenesComponent },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "add-product", component: add_product_component_1.AddProductComponent },
    { path: "bag", component: bag_component_1.BagComponent },
    { path: "modal", component: bag_modal_1.ModalComponent },
    { path: "total", component: total_modal_1.TotalModalComponent },
    { path: "confirm", component: confirm_component_1.ConfirmComponent },
    { path: "orderDetails", component: orderDetails_component_1.OrderDetailsComponent },
    { path: "about", component: about_component_1.AboutComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFHdkUsMkRBQXlEO0FBQ3pELHdEQUFzRDtBQUN0RCxvRUFBa0U7QUFDbEUsMEVBQXdFO0FBQ3hFLGlFQUErRDtBQUMvRCxvRUFBa0U7QUFDbEUsNkVBQTBFO0FBQzFFLHFEQUFtRDtBQUNuRCw2Q0FBaUQ7QUFDakQsaURBQXdEO0FBQ3hELGlFQUErRDtBQUMvRCxnRkFBOEU7QUFDOUUsMkRBQXlEO0FBRXpELDJCQUEyQjtBQUMzQiw2REFBNkQ7QUFDN0Qsb0RBQW9EO0FBQ3BELDREQUE0RDtBQUM1RCxLQUFLO0FBRUwsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQztJQUNuRCxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUM7SUFDMUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSw4QkFBYSxFQUFDO0lBQ3hDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCLEVBQUM7SUFDaEQsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSwwQ0FBbUIsRUFBQztJQUNwRCxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLG9DQUFnQixFQUFDO0lBQzlDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCLEVBQUM7SUFDaEQsRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSwyQ0FBbUIsRUFBQztJQUNyRCxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLDRCQUFZLEVBQUM7SUFDdEMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSwwQkFBYyxFQUFDO0lBQzFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUNBQW1CLEVBQUM7SUFDL0MsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBQztJQUM5QyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLDhDQUFxQixFQUFDO0lBQ3hELEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBQztDQUM3QyxDQUFBO0FBTUQ7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYWluQ29tcG9uZW50IH0gZnJvbSBcIi4vbWFpbi9tYWluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tIFwiLi9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEludmVudGFyaW9Db21wb25lbnQgfSBmcm9tIFwiLi9pbnZlbnRhcmlvL2ludmVudGFyaW8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPcmRlbmVzQ29tcG9uZW50IH0gZnJvbSBcIi4vb3JkZW5lcy9vcmRlbmVzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFkZFByb2R1Y3RDb21wb25lbnQgfSBmcm9tIFwiLi9hZGQtcHJvZHVjdC9hZGQtcHJvZHVjdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEJhZ0NvbXBvbmVudCB9IGZyb20gXCIuL2JhZy9iYWcuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL2JhZy9iYWcubW9kYWxcIjtcbmltcG9ydCB7IFRvdGFsTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9iYWcvdG90YWwubW9kYWxcIjtcbmltcG9ydCB7IENvbmZpcm1Db21wb25lbnQgfSBmcm9tIFwiLi9jb25maXJtL2NvbmZpcm0uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPcmRlckRldGFpbHNDb21wb25lbnQgfSBmcm9tIFwiLi9vcmRlckRldGFpbHMvb3JkZXJEZXRhaWxzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQWJvdXRDb21wb25lbnQgfSBmcm9tIFwiLi9hYm91dC9hYm91dC5jb21wb25lbnRcIjtcblxuLy8gY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4vLyAgICAgeyBwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIi9pdGVtc1wiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXG4vLyAgICAgeyBwYXRoOiBcIml0ZW1zXCIsIGNvbXBvbmVudDogSXRlbXNDb21wb25lbnQgfSxcbi8vICAgICB7IHBhdGg6IFwiaXRlbS86aWRcIiwgY29tcG9uZW50OiBJdGVtRGV0YWlsQ29tcG9uZW50IH0sXG4vLyBdO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7cGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvbG9naW5cIiwgcGF0aE1hdGNoOiBcImZ1bGxcIn0sXG4gICAge3BhdGg6IFwibG9naW5cIiwgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudH0sXG4gICAge3BhdGg6IFwibWFpblwiLCBjb21wb25lbnQ6IE1haW5Db21wb25lbnR9LFxuICAgIHtwYXRoOiBcInNldHRpbmdzXCIsIGNvbXBvbmVudDogU2V0dGluZ3NDb21wb25lbnR9LFxuICAgIHtwYXRoOiBcImludmVudGFyaW9cIiwgY29tcG9uZW50OiBJbnZlbnRhcmlvQ29tcG9uZW50fSxcbiAgICB7cGF0aDogXCJvcmRlbmVzXCIsIGNvbXBvbmVudDogT3JkZW5lc0NvbXBvbmVudH0sXG4gICAge3BhdGg6IFwicmVnaXN0ZXJcIiwgY29tcG9uZW50OiBSZWdpc3RlckNvbXBvbmVudH0sXG4gICAge3BhdGg6IFwiYWRkLXByb2R1Y3RcIiwgY29tcG9uZW50OiBBZGRQcm9kdWN0Q29tcG9uZW50fSxcbiAgICB7cGF0aDogXCJiYWdcIiwgY29tcG9uZW50OiBCYWdDb21wb25lbnR9LFxuICAgIHtwYXRoOiBcIm1vZGFsXCIsIGNvbXBvbmVudDogTW9kYWxDb21wb25lbnR9LFxuICAgIHtwYXRoOiBcInRvdGFsXCIsIGNvbXBvbmVudDogVG90YWxNb2RhbENvbXBvbmVudH0sXG4gICAge3BhdGg6IFwiY29uZmlybVwiLCBjb21wb25lbnQ6IENvbmZpcm1Db21wb25lbnR9LFxuICAgIHtwYXRoOiBcIm9yZGVyRGV0YWlsc1wiLCBjb21wb25lbnQ6IE9yZGVyRGV0YWlsc0NvbXBvbmVudH0sXG4gICAge3BhdGg6IFwiYWJvdXRcIiwgY29tcG9uZW50OiBBYm91dENvbXBvbmVudH1cbl1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7IH0iXX0=