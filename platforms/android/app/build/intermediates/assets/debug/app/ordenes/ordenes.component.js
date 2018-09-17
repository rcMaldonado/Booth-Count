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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZW5lcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlbmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUkvRiw4REFBNEY7QUFFNUYsMENBQXlDO0FBQ3pDLDBDQUF5QztBQUV6Qyx3REFBMEQ7QUFFMUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFTNUM7SUFPSSw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBQ2pILDBCQUFvQixtQkFBc0MsRUFBVSxNQUFjLEVBQVUsSUFBVTtRQUFsRix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFOOUYsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQUN4QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBTTNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzVELENBQUM7SUFFRCxtQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUtELDBDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sdUNBQVksR0FBbkI7UUFBQSxpQkFXQztRQVZHLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lB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d0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IEFjdGlvbkl0ZW0gfSBmcm9tIFwidWkvYWN0aW9uLWJhclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi9wcm92aWRlcnMvZGF0YVwiO1xuXG5pbXBvcnQgKiBhcyBsb2NhbFN0b3JhZ2UgZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2VcIjtcblxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm9yZGVuZXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vb3JkZW5lcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9vcmRlbmVzLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgT3JkZW5lc0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgcHJpdmF0ZSBvcmRlcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBwcml2YXRlIHNhbGVzOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHJpdmF0ZSB2ZW5kb3JJZDtcblxuICAgIC8vIFRoaXMgcGF0dGVybiBtYWtlcyB1c2Ugb2YgQW5ndWxhcuKAmXMgZGVwZW5kZW5jeSBpbmplY3Rpb24gaW1wbGVtZW50YXRpb24gdG8gaW5qZWN0IGFuIGluc3RhbmNlIG9mIHRoZSBJdGVtU2VydmljZSBzZXJ2aWNlIGludG8gdGhpcyBjbGFzcy4gXG4gICAgLy8gQW5ndWxhciBrbm93cyBhYm91dCB0aGlzIHNlcnZpY2UgYmVjYXVzZSBpdCBpcyBpbmNsdWRlZCBpbiB5b3VyIGFwcOKAmXMgbWFpbiBOZ01vZHVsZSwgZGVmaW5lZCBpbiBhcHAubW9kdWxlLnRzLlxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICB0aGlzLmNyZWF0ZU9yZGVycygpO1xuICAgICAgICB0aGlzLnZlbmRvcklkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ2ZW5kb3JcIikudmVuZG9ySWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAgIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgdGhpcy5nZXRPcmRlcnMoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgdGhpcy5nZXRTYWxlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVPcmRlcnMoKSB7XG4gICAgICAgIChuZXcgU3FsaXRlKFwiYm9vdGguZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIuZXhlY1NRTChcIkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIG9yZGVycyhvcmRlcklkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCwgc2FsZXNJZCBJTlRFR0VSLCB0b3RhbFByaWNlIFRFWFQsIEZPUkVJR04gS0VZIChzYWxlc0lkKSBSRUZFUkVOQ0VTIHNhbGVzKHNhbGVzSWQpIE9OIFVQREFURSBDQVNDQURFIE9OIERFTEVURSBDQVNDQURFKVwiKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzIHVwZGF0aW5nIGRiXCIpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9QRU4gREIgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T3JkZXJzKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCBvcmRlcnMub3JkZXJJZCwgb3JkZXJzLnNhbGVzSWQsIG9yZGVycy50b3RhbFByaWNlIEZST00gb3JkZXJzLCBzYWxlcyBXSEVSRSBzYWxlcy52ZW5kb3JJZCA9IFwiICsgdGhpcy52ZW5kb3JJZCArIFwiIEdST1VQIEJZIG9yZGVySWQgT1JERVIgQlkgb3JkZXJJZCBERVNDXCIpLnRoZW4ocm93cyA9PiB7XG4gICAgICAgICAgICB0aGlzLm9yZGVycyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgXCJvcmRlcklkXCI6IHJvd3Nbcm93XVswXSxcbiAgICAgICAgICAgICAgICAgICAgXCJzYWxlc0lkXCI6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOiByb3dzW3Jvd11bMl1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXJzKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2FsZXMoKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBzYWxlc1wiKS50aGVuKHJvd3MgPT4ge1xuICAgICAgICAgICAgdGhpcy5zYWxlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcInNhbGVzSWRcIjogcm93c1tyb3ddWzBdLFxuICAgICAgICAgICAgICAgICAgICBcInZlbmRvcklkXCI6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0SWRcIjogcm93c1tyb3ddWzJdLFxuICAgICAgICAgICAgICAgICAgICBcInF1YW50aXR5VG9TYWxlXCI6IHJvd3Nbcm93XVszXSxcbiAgICAgICAgICAgICAgICAgICAgXCJwcmljZVN1bVwiOiByb3dzW3Jvd11bNF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2FsZXMpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRHJhd2VyKCkge1xuICAgICAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xvc2VEcmF3ZXJUYXAoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgIGxldCBpbmRleCA9IGFyZ3MuaW5kZXg7XG4gICAgICAgIHRoaXMuZGF0YS5pZCA9IHRoaXMub3JkZXJzW2luZGV4XS5vcmRlcklkXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm9yZGVyRGV0YWlsc1wiXSwge30pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0luaWNpbygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydtYWluJ10pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0ludmVudGFyaW8oKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnaW52ZW50YXJpbyddKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9PcmRlbmVzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ29yZGVuZXMnXSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9BanVzdGVzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3NldHRpbmdzJ10pO1xuICAgIH1cbn0iXX0=