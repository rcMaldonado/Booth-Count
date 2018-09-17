"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var localStorage = require("nativescript-localstorage");
var email = require("nativescript-email");
var router_1 = require("nativescript-angular/router");
var Sqlite = require("nativescript-sqlite");
var SettingsComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function SettingsComponent(_changeDetectionRef, router) {
        this._changeDetectionRef = _changeDetectionRef;
        this.router = router;
        this.reportInfo = [];
        this.vendor = localStorage.getItem("vendor");
        this.getReportInfo();
        this.generateReport();
    }
    SettingsComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    SettingsComponent.prototype.ngOnInit = function () {
        this.name = this.vendor.name;
        this.composeOptions = {
            to: [this.vendor.email],
            subject: "Nativescript Email",
            body: this.report
        };
    };
    SettingsComponent.prototype.sendEmail = function () {
        var _this = this;
        email.available().then(function (available) {
            console.log("Se puede por email:", available);
            if (available) {
                email.compose(_this.composeOptions).then(function (result) {
                    console.log(result);
                });
            }
        });
    };
    SettingsComponent.prototype.generateReport = function () {
        var tempString;
        this.report = "Reporte de: " + this.vendor.name + "\n\n";
        for (var i = 0; i < this.reportInfo.length; i++) {
            tempString = "Producto: " + this.reportInfo[i].productName + "\n" +
                "Precio: " + this.reportInfo[i].productPrice + "\n" +
                "Balance Inicial: " + this.reportInfo[i].initialBalance + "\n" +
                "Vendido: " + this.reportInfo[i].sold + "\n" +
                "Balance Final: " + this.reportInfo[i].finalBalance + "\n" +
                "Total en ventas: $" + this.reportInfo[i].totalSold + "\n\n";
            this.report += tempString;
        }
    };
    SettingsComponent.prototype.getReportInfo = function () {
        var _this = this;
        (new Sqlite("booth.db")).then(function (db) {
            db.all("SELECT productName, productPrice, initialBalance, balance FROM inventory").then(function (rows) {
                _this.inventory = [];
                for (var row in rows) {
                    _this.inventory.push({
                        "productName": rows[row][0],
                        "productPrice": rows[row][1],
                        "initialBalance": rows[row][2],
                        "balance": rows[row][3]
                    });
                }
                // console.log(this.inventory);
                _this.calculateReport();
                _this.generateReport();
                _this.database = db;
                console.log("Success updating db");
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    };
    SettingsComponent.prototype.calculateReport = function () {
        for (var i = 0; i < this.inventory.length; i++) {
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
    };
    SettingsComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    SettingsComponent.prototype.onCloseDrawerTap = function () {
        this.drawer.closeDrawer();
    };
    SettingsComponent.prototype.toInicio = function () {
        this.router.navigate(['main']);
    };
    SettingsComponent.prototype.toInventario = function () {
        this.router.navigate(['inventario']);
    };
    SettingsComponent.prototype.toOrdenes = function () {
        this.router.navigate(['ordenes']);
    };
    SettingsComponent.prototype.toAjustes = function () {
        this.router.navigate(['settings']);
    };
    SettingsComponent.prototype.toAbout = function () {
        this.router.navigate(["about"]);
    };
    SettingsComponent.prototype.logout = function () {
        this.router.navigate(['login'], { clearHistory: true });
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SettingsComponent.prototype, "drawerComponent", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "settings",
            moduleId: module.id,
            templateUrl: "./settings.component.html",
            styleUrls: ["./settings.component.css"]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, router_1.RouterExtensions])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStGO0FBRy9GLDhEQUE0RjtBQUU1Rix3REFBMEQ7QUFDMUQsMENBQTRDO0FBQzVDLHNEQUErRDtBQUUvRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQVE1QztJQVNJLDZJQUE2STtJQUM3SSxpSEFBaUg7SUFDakgsMkJBQW9CLG1CQUFzQyxFQUFVLE1BQXdCO1FBQXhFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUhwRixlQUFVLEdBQWUsRUFBRSxDQUFDO1FBSWhDLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFLRCwyQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbEIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDdkIsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztJQUNOLENBQUM7SUFFTSxxQ0FBUyxHQUFoQjtRQUFBLGlCQVNDO1FBUkcsS0FBSyxD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QkFBQztDQUFBLEFBbElELElBa0lDO0FBbElZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQWN0aW9uSXRlbSB9IGZyb20gXCJ1aS9hY3Rpb24tYmFyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXInO1xuaW1wb3J0ICogYXMgbG9jYWxTdG9yYWdlIGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCI7XG5pbXBvcnQgKiBhcyBlbWFpbCBmcm9tIFwibmF0aXZlc2NyaXB0LWVtYWlsXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNldHRpbmdzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NldHRpbmdzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3NldHRpbmdzLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSB2ZW5kb3I6IGFueTtcbiAgICBwcml2YXRlIG5hbWU6IFN0cmluZ1xuICAgIHByaXZhdGUgY29tcG9zZU9wdGlvbnM6IGVtYWlsLkNvbXBvc2VPcHRpb25zO1xuICAgIHByaXZhdGUgcmVwb3J0OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICAgIHByaXZhdGUgaW52ZW50b3J5OiBBcnJheTxhbnk+XG4gICAgcHJpdmF0ZSByZXBvcnRJbmZvOiBBcnJheTxhbnk+ID0gW107XG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy4oCZcyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw4oCZcyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy52ZW5kb3IgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInZlbmRvclwiKTtcbiAgICAgICAgdGhpcy5nZXRSZXBvcnRJbmZvKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSZXBvcnQoKTtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gICAgcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy52ZW5kb3IubmFtZTtcbiAgICAgICAgdGhpcy5jb21wb3NlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRvOiBbdGhpcy52ZW5kb3IuZW1haWxdLFxuICAgICAgICAgICAgc3ViamVjdDogXCJOYXRpdmVzY3JpcHQgRW1haWxcIixcbiAgICAgICAgICAgIGJvZHk6IHRoaXMucmVwb3J0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHNlbmRFbWFpbCgpIHtcbiAgICAgICAgZW1haWwuYXZhaWxhYmxlKCkudGhlbihhdmFpbGFibGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZSBwdWVkZSBwb3IgZW1haWw6XCIsIGF2YWlsYWJsZSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgZW1haWwuY29tcG9zZSh0aGlzLmNvbXBvc2VPcHRpb25zKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZW5lcmF0ZVJlcG9ydCgpIHtcbiAgICAgICAgbGV0IHRlbXBTdHJpbmc7XG4gICAgICAgIHRoaXMucmVwb3J0ID0gXCJSZXBvcnRlIGRlOiBcIiArIHRoaXMudmVuZG9yLm5hbWUgKyBcIlxcblxcblwiOyBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMucmVwb3J0SW5mby5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRlbXBTdHJpbmcgPSBcIlByb2R1Y3RvOiBcIiArIHRoaXMucmVwb3J0SW5mb1tpXS5wcm9kdWN0TmFtZSArIFwiXFxuXCIgK1xuICAgICAgICAgICAgICAgIFwiUHJlY2lvOiBcIiArIHRoaXMucmVwb3J0SW5mb1tpXS5wcm9kdWN0UHJpY2UgKyBcIlxcblwiICtcbiAgICAgICAgICAgICAgICBcIkJhbGFuY2UgSW5pY2lhbDogXCIgKyB0aGlzLnJlcG9ydEluZm9baV0uaW5pdGlhbEJhbGFuY2UgKyBcIlxcblwiICtcbiAgICAgICAgICAgICAgICBcIlZlbmRpZG86IFwiICsgdGhpcy5yZXBvcnRJbmZvW2ldLnNvbGQgKyBcIlxcblwiICtcbiAgICAgICAgICAgICAgICBcIkJhbGFuY2UgRmluYWw6IFwiICsgdGhpcy5yZXBvcnRJbmZvW2ldLmZpbmFsQmFsYW5jZSArIFwiXFxuXCIgK1xuICAgICAgICAgICAgICAgIFwiVG90YWwgZW4gdmVudGFzOiAkXCIgKyB0aGlzLnJlcG9ydEluZm9baV0udG90YWxTb2xkICsgXCJcXG5cXG5cIjtcblxuICAgICAgICAgICAgdGhpcy5yZXBvcnQgKz0gdGVtcFN0cmluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSZXBvcnRJbmZvKCkge1xuICAgICAgICAobmV3IFNxbGl0ZShcImJvb3RoLmRiXCIpKS50aGVuKGRiID0+IHtcbiAgICAgICAgICAgIGRiLmFsbChcIlNFTEVDVCBwcm9kdWN0TmFtZSwgcHJvZHVjdFByaWNlLCBpbml0aWFsQmFsYW5jZSwgYmFsYW5jZSBGUk9NIGludmVudG9yeVwiKS50aGVuKCByb3dzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmludmVudG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHJvdyBpbiByb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW52ZW50b3J5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0TmFtZVwiOiByb3dzW3Jvd11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RQcmljZVwiOiByb3dzW3Jvd11bMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluaXRpYWxCYWxhbmNlXCI6IHJvd3Nbcm93XVsyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmFsYW5jZVwiOiByb3dzW3Jvd11bM11cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaW52ZW50b3J5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVJlcG9ydCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVSZXBvcnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzIHVwZGF0aW5nIGRiXCIpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9QRU4gREIgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsY3VsYXRlUmVwb3J0KCkge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5pbnZlbnRvcnkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5yZXBvcnRJbmZvLnB1c2goe1xuICAgICAgICAgICAgICAgIFwicHJvZHVjdE5hbWVcIjogdGhpcy5pbnZlbnRvcnlbaV0ucHJvZHVjdE5hbWUsXG4gICAgICAgICAgICAgICAgXCJwcm9kdWN0UHJpY2VcIjogdGhpcy5pbnZlbnRvcnlbaV0ucHJvZHVjdFByaWNlLFxuICAgICAgICAgICAgICAgIFwiaW5pdGlhbEJhbGFuY2VcIjogdGhpcy5pbnZlbnRvcnlbaV0uaW5pdGlhbEJhbGFuY2UsXG4gICAgICAgICAgICAgICAgXCJzb2xkXCI6ICh0aGlzLmludmVudG9yeVtpXS5pbml0aWFsQmFsYW5jZSAtIHRoaXMuaW52ZW50b3J5W2ldLmJhbGFuY2UpLFxuICAgICAgICAgICAgICAgIFwiZmluYWxCYWxhbmNlXCI6IHRoaXMuaW52ZW50b3J5W2ldLmJhbGFuY2UsXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFNvbGRcIjogKHRoaXMuaW52ZW50b3J5W2ldLnByb2R1Y3RQcmljZSAqICh0aGlzLmludmVudG9yeVtpXS5pbml0aWFsQmFsYW5jZSAtIHRoaXMuaW52ZW50b3J5W2ldLmJhbGFuY2UpKSBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVwb3J0SW5mbyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5EcmF3ZXIoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbG9zZURyYXdlclRhcCgpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9JbmljaW8oKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnbWFpbiddKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9JbnZlbnRhcmlvKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2ludmVudGFyaW8nXSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvT3JkZW5lcygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydvcmRlbmVzJ10pXG4gICAgfVxuXG4gICAgcHVibGljIHRvQWp1c3RlcygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydzZXR0aW5ncyddKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9BYm91dCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiYWJvdXRcIl0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9nb3V0KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2xvZ2luJ10sIHtjbGVhckhpc3Rvcnk6IHRydWV9KTtcbiAgICB9XG59Il19