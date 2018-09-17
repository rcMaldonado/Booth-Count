"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var router_1 = require("@angular/router");
var data_1 = require("../providers/data");
var localStorage = require("nativescript-localstorage");
var Sqlite = require("nativescript-sqlite");
var OrdenesComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function OrdenesComponent(_changeDetectionRef, router, data) {
        this._changeDetectionRef = _changeDetectionRef;
        this.router = router;
        this.data = data;
        this.orders = [];
        this.sales = [];
        this.createOrders();
        this.vendorId = localStorage.getItem("vendor").vendorId;
    }
    OrdenesComponent.prototype.ngOnInit = function () {
    };
    OrdenesComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        this.getOrders();
        console.log("-----------------------------------------------------------");
        this.getSales();
    };
    OrdenesComponent.prototype.createOrders = function () {
        var _this = this;
        (new Sqlite("booth.db")).then(function (db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS orders(orderId INTEGER PRIMARY KEY AUTOINCREMENT, salesId INTEGER, totalPrice TEXT, FOREIGN KEY (salesId) REFERENCES sales(salesId) ON UPDATE CASCADE ON DELETE CASCADE)").then(function () {
                _this.database = db;
                console.log("Success updating db");
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    };
    OrdenesComponent.prototype.getOrders = function () {
        var _this = this;
        this.database.all("SELECT orders.orderId, orders.salesId, orders.totalPrice FROM orders, sales WHERE sales.vendorId = " + this.vendorId + " GROUP BY orderId ORDER BY orderId DESC").then(function (rows) {
            _this.orders = [];
            for (var row in rows) {
                _this.orders.push({
                    "orderId": rows[row][0],
                    "salesId": rows[row][1],
                    "total": rows[row][2]
                });
            }
            _this.arrayLength = _this.orders.length;
            console.log(_this.orders);
        }, function (error) {
            console.log("SELECT ERROR", error);
        });
    };
    OrdenesComponent.prototype.getSales = function () {
        var _this = this;
        this.database.all("SELECT * FROM sales").then(function (rows) {
            _this.sales = [];
            for (var row in rows) {
                _this.sales.push({
                    "salesId": rows[row][0],
                    "vendorId": rows[row][1],
                    "productId": rows[row][2],
                    "quantityToSale": rows[row][3],
                    "priceSum": rows[row][4]
                });
            }
            console.log(_this.sales);
        }, function (error) {
            console.log("SELECT ERROR", error);
        });
    };
    OrdenesComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    OrdenesComponent.prototype.onCloseDrawerTap = function () {
        this.drawer.closeDrawer();
    };
    OrdenesComponent.prototype.onItemTap = function (args) {
        var index = args.index;
        this.data.id = this.orders[index].orderId;
        this.router.navigate(["orderDetails"], {});
    };
    OrdenesComponent.prototype.toInicio = function () {
        this.router.navigate(['main']);
    };
    OrdenesComponent.prototype.toInventario = function () {
        this.router.navigate(['inventario']);
    };
    OrdenesComponent.prototype.toOrdenes = function () {
        this.router.navigate(['ordenes']);
    };
    OrdenesComponent.prototype.toAjustes = function () {
        this.router.navigate(['settings']);
    };
    OrdenesComponent.prototype.toAbout = function () {
        this.router.navigate(["about"]);
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], OrdenesComponent.prototype, "drawerComponent", void 0);
    OrdenesComponent = __decorate([
        core_1.Component({
            selector: "ordenes",
            moduleId: module.id,
            templateUrl: "./ordenes.component.html",
            styleUrls: ["./ordenes.component.css"]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, router_1.Router, data_1.Data])
    ], OrdenesComponent);
    return OrdenesComponent;
}());
exports.OrdenesComponent = OrdenesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZW5lcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlbmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUkvRiw4REFBNEY7QUFFNUYsMENBQXlDO0FBQ3pDLDBDQUF5QztBQUV6Qyx3REFBMEQ7QUFFMUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFTNUM7SUFTSSw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBQ2pILDBCQUFvQixtQkFBc0MsRUFBVSxNQUFjLEVBQVUsSUFBVTtRQUFsRix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFSOUYsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUN4QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBUTNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzVELENBQUM7SUFFRCxtQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUtELDBDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sdUNBQVksR0FBbkI7UUFBQSxpQkFXQztRQVZHLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lB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ZUFBTSxFQUFnQixXQUFJO09BWDdGLGdCQUFnQixDQWdINUI7SUFBRCx1QkFBQztDQUFBLEFBaEhELElBZ0hDO0FBaEhZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQWN0aW9uSXRlbSB9IGZyb20gXCJ1aS9hY3Rpb24tYmFyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uL3Byb3ZpZGVycy9kYXRhXCI7XG5cbmltcG9ydCAqIGFzIGxvY2FsU3RvcmFnZSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiO1xuXG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwib3JkZW5lc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9vcmRlbmVzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL29yZGVuZXMuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBPcmRlbmVzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcblxuICAgIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgICBwcml2YXRlIG9yZGVyczogQXJyYXk8YW55PiA9IFtdO1xuICAgIHByaXZhdGUgc2FsZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBwcml2YXRlIHZlbmRvcklkO1xuICAgIHB1YmxpYyBhcnJheUxlbmd0aDtcblxuXG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy4oCZcyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw4oCZcyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhOiBEYXRhKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlT3JkZXJzKCk7XG4gICAgICAgIHRoaXMudmVuZG9ySWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInZlbmRvclwiKS52ZW5kb3JJZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gICAgcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICB0aGlzLmdldE9yZGVycygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICB0aGlzLmdldFNhbGVzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU9yZGVycygpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJib290aC5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICBkYi5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgb3JkZXJzKG9yZGVySWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULCBzYWxlc0lkIElOVEVHRVIsIHRvdGFsUHJpY2UgVEVYVCwgRk9SRUlHTiBLRVkgKHNhbGVzSWQpIFJFRkVSRU5DRVMgc2FsZXMoc2FsZXNJZCkgT04gVVBEQVRFIENBU0NBREUgT04gREVMRVRFIENBU0NBREUpXCIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3MgdXBkYXRpbmcgZGJcIik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1BFTiBEQiBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPcmRlcnMoKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUIG9yZGVycy5vcmRlcklkLCBvcmRlcnMuc2FsZXNJZCwgb3JkZXJzLnRvdGFsUHJpY2UgRlJPTSBvcmRlcnMsIHNhbGVzIFdIRVJFIHNhbGVzLnZlbmRvcklkID0gXCIgKyB0aGlzLnZlbmRvcklkICsgXCIgR1JPVVAgQlkgb3JkZXJJZCBPUkRFUiBCWSBvcmRlcklkIERFU0NcIikudGhlbihyb3dzID0+IHtcbiAgICAgICAgICAgIHRoaXMub3JkZXJzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgaW4gcm93cykge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcIm9yZGVySWRcIjogcm93c1tyb3ddWzBdLFxuICAgICAgICAgICAgICAgICAgICBcInNhbGVzSWRcIjogcm93c1tyb3ddWzFdLFxuICAgICAgICAgICAgICAgICAgICBcInRvdGFsXCI6IHJvd3Nbcm93XVsyXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcnJheUxlbmd0aCA9IHRoaXMub3JkZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXJzKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2FsZXMoKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBzYWxlc1wiKS50aGVuKHJvd3MgPT4ge1xuICAgICAgICAgICAgdGhpcy5zYWxlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcInNhbGVzSWRcIjogcm93c1tyb3ddWzBdLFxuICAgICAgICAgICAgICAgICAgICBcInZlbmRvcklkXCI6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0SWRcIjogcm93c1tyb3ddWzJdLFxuICAgICAgICAgICAgICAgICAgICBcInF1YW50aXR5VG9TYWxlXCI6IHJvd3Nbcm93XVszXSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmljZVN1bVwiOiByb3dzW3Jvd11bNF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2FsZXMpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRHJhd2VyKCkge1xuICAgICAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xvc2VEcmF3ZXJUYXAoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgIGxldCBpbmRleCA9IGFyZ3MuaW5kZXg7XG4gICAgICAgIHRoaXMuZGF0YS5pZCA9IHRoaXMub3JkZXJzW2luZGV4XS5vcmRlcklkXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm9yZGVyRGV0YWlsc1wiXSwge30pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0luaWNpbygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydtYWluJ10pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0ludmVudGFyaW8oKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnaW52ZW50YXJpbyddKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9PcmRlbmVzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ29yZGVuZXMnXSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9BanVzdGVzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3NldHRpbmdzJ10pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0Fib3V0KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJhYm91dFwiXSk7XG4gICAgfVxufSJdfQ==