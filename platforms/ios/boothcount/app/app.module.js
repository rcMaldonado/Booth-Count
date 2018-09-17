"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var angular_2 = require("nativescript-drop-down/angular");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
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
// Uncomment and add to NgModule imports if you need to use two-way binding
var forms_1 = require("nativescript-angular/forms");
var data_1 = require("./providers/data");
var productDetails_1 = require("./providers/productDetails/productDetails");
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_1.AppRoutingModule,
                angular_1.NativeScriptUISideDrawerModule,
                angular_2.DropDownModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                main_component_1.MainComponent,
                settings_component_1.SettingsComponent,
                inventario_component_1.InventarioComponent,
                ordenes_component_1.OrdenesComponent,
                register_component_1.RegisterComponent,
                add_product_component_1.AddProductComponent,
                bag_component_1.BagComponent,
                bag_modal_1.ModalComponent,
                total_modal_1.TotalModalComponent,
                confirm_component_1.ConfirmComponent,
                orderDetails_component_1.OrderDetailsComponent,
                about_component_1.AboutComponent
            ],
            entryComponents: [bag_modal_1.ModalComponent, total_modal_1.TotalModalComponent],
            providers: [
                modal_dialog_1.ModalDialogService,
                data_1.Data,
                productDetails_1.ProductDetails
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFFL0MsOERBQW9GO0FBQ3BGLDBEQUFnRTtBQUNoRSxrRUFBdUU7QUFFdkUsMkRBQXlEO0FBQ3pELHdEQUFzRDtBQUN0RCxvRUFBa0U7QUFDbEUsMEVBQXdFO0FBQ3hFLGlFQUErRDtBQUMvRCxvRUFBa0U7QUFDbEUsNkVBQTBFO0FBQzFFLHFEQUFtRDtBQUNuRCw2Q0FBaUQ7QUFDakQsaURBQXdEO0FBQ3hELGlFQUErRDtBQUMvRCxnRkFBOEU7QUFDOUUsMkRBQXlEO0FBRXpELDJFQUEyRTtBQUMzRSxvREFBcUU7QUFFckUseUNBQXdDO0FBQ3hDLDRFQUEyRTtBQUUzRSw2RUFBNkU7QUFDN0Usc0VBQXNFO0FBMEN0RTtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUF4Q3JCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsOEJBQWdCO2dCQUNoQix3Q0FBOEI7Z0JBQzlCLHdCQUFjO2dCQUNkLCtCQUF1QjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCw4QkFBYTtnQkFDYixzQ0FBaUI7Z0JBQ2pCLDBDQUFtQjtnQkFDbkIsb0NBQWdCO2dCQUNoQixzQ0FBaUI7Z0JBQ2pCLDJDQUFtQjtnQkFDbkIsNEJBQVk7Z0JBQ1osMEJBQWM7Z0JBQ2QsaUNBQW1CO2dCQUNuQixvQ0FBZ0I7Z0JBQ2hCLDhDQUFxQjtnQkFDckIsZ0NBQWM7YUFDakI7WUFDRCxlQUFlLEVBQUUsQ0FBRSwwQkFBYyxFQUFFLGlDQUFtQixDQUFDO1lBQ3ZELFNBQVMsRUFBRTtnQkFDUCxpQ0FBa0I7Z0JBQ2xCLFdBQUk7Z0JBQ0osK0JBQWM7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztRQUNGOztVQUVFO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgRHJvcERvd25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5cbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYWluQ29tcG9uZW50IH0gZnJvbSBcIi4vbWFpbi9tYWluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tIFwiLi9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEludmVudGFyaW9Db21wb25lbnQgfSBmcm9tIFwiLi9pbnZlbnRhcmlvL2ludmVudGFyaW8uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPcmRlbmVzQ29tcG9uZW50IH0gZnJvbSBcIi4vb3JkZW5lcy9vcmRlbmVzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFkZFByb2R1Y3RDb21wb25lbnQgfSBmcm9tIFwiLi9hZGQtcHJvZHVjdC9hZGQtcHJvZHVjdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEJhZ0NvbXBvbmVudCB9IGZyb20gXCIuL2JhZy9iYWcuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL2JhZy9iYWcubW9kYWxcIjtcbmltcG9ydCB7IFRvdGFsTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9iYWcvdG90YWwubW9kYWxcIjtcbmltcG9ydCB7IENvbmZpcm1Db21wb25lbnQgfSBmcm9tIFwiLi9jb25maXJtL2NvbmZpcm0uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPcmRlckRldGFpbHNDb21wb25lbnQgfSBmcm9tIFwiLi9vcmRlckRldGFpbHMvb3JkZXJEZXRhaWxzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQWJvdXRDb21wb25lbnQgfSBmcm9tIFwiLi9hYm91dC9hYm91dC5jb21wb25lbnRcIjtcblxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyBpZiB5b3UgbmVlZCB0byB1c2UgdHdvLXdheSBiaW5kaW5nXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4vcHJvdmlkZXJzL2RhdGFcIjtcbmltcG9ydCB7IFByb2R1Y3REZXRhaWxzIH0gZnJvbSBcIi4vcHJvdmlkZXJzL3Byb2R1Y3REZXRhaWxzL3Byb2R1Y3REZXRhaWxzXCI7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgIGlmIHlvdSBuZWVkIHRvIHVzZSB0aGUgSFRUUCB3cmFwcGVyXG4vLyBpbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxuICAgICAgICBEcm9wRG93bk1vZHVsZSwgXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcbiAgICAgICAgTWFpbkNvbXBvbmVudCxcbiAgICAgICAgU2V0dGluZ3NDb21wb25lbnQsXG4gICAgICAgIEludmVudGFyaW9Db21wb25lbnQsXG4gICAgICAgIE9yZGVuZXNDb21wb25lbnQsXG4gICAgICAgIFJlZ2lzdGVyQ29tcG9uZW50LFxuICAgICAgICBBZGRQcm9kdWN0Q29tcG9uZW50LFxuICAgICAgICBCYWdDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBUb3RhbE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBDb25maXJtQ29tcG9uZW50LFxuICAgICAgICBPcmRlckRldGFpbHNDb21wb25lbnQsXG4gICAgICAgIEFib3V0Q29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFsgTW9kYWxDb21wb25lbnQsIFRvdGFsTW9kYWxDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIERhdGEsXG4gICAgICAgIFByb2R1Y3REZXRhaWxzXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuLypcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcbiovXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19