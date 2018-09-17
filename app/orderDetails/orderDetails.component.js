"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var data_1 = require("../providers/data");
var localStorage = require("nativescript-localstorage");
var Sqlite = require("nativescript-sqlite");
var OrderDetailsComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function OrderDetailsComponent(router, data) {
        this.router = router;
        this.data = data;
        this.getOrderDetails();
        this.vendorId = localStorage.getItem("vendor").vendorId;
        this.name = localStorage.getItem("vendor").name;
    }
    OrderDetailsComponent.prototype.ngOnInit = function () {
        this.orderId = this.data.id;
        this.getTotal();
    };
    OrderDetailsComponent.prototype.goBack = function () {
        this.router.back();
    };
    OrderDetailsComponent.prototype.getOrderDetails = function () {
        var _this = this;
        (new Sqlite("booth.db")).then(function (db) {
            var query = "SELECT inventory.productCode, inventory.productName, sales.quantityToSale, inventory.productPrice, sales.priceSum FROM orders, sales, inventory, vendor WHERE orders.salesId = sales.salesId AND sales.vendorId = " + _this.vendorId + " AND orders.orderId = " + _this.data.id + " AND inventory.id = sales.productId";
            db.all(query).then(function (rows) {
                _this.database = db;
                _this.order = [];
                for (var row in rows) {
                    _this.order.push({
                        "productCode": rows[row][0],
                        "productName": rows[row][1],
                        "quantity": rows[row][2],
                        "productPrice": rows[row][3],
                        "priceSum": rows[row][4],
                    });
                }
                console.log(_this.order);
            }, function (error) {
                console.log("SELECT ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    };
    OrderDetailsComponent.prototype.getTotal = function () {
        var _this = this;
        this.database.all("SELECT totalPrice FROM orders WHERE orderId = " + this.data.id).then(function (rows) {
            for (var row in rows) {
                _this.total = rows[row][0];
                console.log(_this.total);
            }
        }, function (error) {
            console.log("SELECT ERROR", error);
        });
    };
    OrderDetailsComponent = __decorate([
        core_1.Component({
            selector: "orderDetails",
            moduleId: module.id,
            templateUrl: "./orderDetails.component.html",
            styleUrls: ["./orderDetails.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, data_1.Data])
    ], OrderDetailsComponent);
    return OrderDetailsComponent;
}());
exports.OrderDetailsComponent = OrderDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJEZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBQy9ELDBDQUF5QztBQUN6Qyx3REFBMEQ7QUFFMUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFRNUM7SUFVSSw2SUFBNkk7SUFDN0ksaUhBQWlIO0lBQ2pILCtCQUFvQixNQUF3QixFQUFVLElBQVU7UUFBNUMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzVELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sc0NBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLCtDQUFlLEdBQXRCO1FBQUEsaUJBc0JDO1FBckJHLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBQzVCLElBQUksS0FBSyxHQUFHLG9OQUFvTixHQUFHLEtBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQXdCLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcscUNBQXFDLENBQUM7WUFDblUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUUsVUFBQSxJQUFJO2dCQUNwQixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ25CLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNaLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLGNBQWMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDM0IsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDM0IsQ0FBQyxFQUFFLFVBQUEsS0FBSztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBUSxHQUFmO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBRSxVQUFBLElBQUk7WUFDekYsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNURRLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FhOEIseUJBQWdCLEVBQWdCLFdBQUk7T0FadkQscUJBQXFCLENBNkRqQztJQUFELDRCQUFDO0NBQUEsQUE3REQsSUE2REM7QUE3RFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vcHJvdmlkZXJzL2RhdGFcIjtcbmltcG9ydCAqIGFzIGxvY2FsU3RvcmFnZSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiO1xuXG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm9yZGVyRGV0YWlsc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9vcmRlckRldGFpbHMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vb3JkZXJEZXRhaWxzLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgICBwdWJsaWMgb3JkZXI6IEFycmF5PGFueT47XG4gICAgcHVibGljIG9yZGVySWQ7XG4gICAgcHVibGljIHZlbmRvcklkO1xuICAgIHB1YmxpYyB0b3RhbDtcblxuICAgIHByaXZhdGUgbmFtZTogU3RyaW5nO1xuXG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy4oCZcyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw4oCZcyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgZGF0YTogRGF0YSkge1xuICAgICAgICB0aGlzLmdldE9yZGVyRGV0YWlscygpO1xuICAgICAgICB0aGlzLnZlbmRvcklkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ2ZW5kb3JcIikudmVuZG9ySWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidmVuZG9yXCIpLm5hbWU7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3JkZXJJZCA9IHRoaXMuZGF0YS5pZDtcbiAgICAgICAgdGhpcy5nZXRUb3RhbCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyLmJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T3JkZXJEZXRhaWxzICgpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJib290aC5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICBsZXQgcXVlcnkgPSBcIlNFTEVDVCBpbnZlbnRvcnkucHJvZHVjdENvZGUsIGludmVudG9yeS5wcm9kdWN0TmFtZSwgc2FsZXMucXVhbnRpdHlUb1NhbGUsIGludmVudG9yeS5wcm9kdWN0UHJpY2UsIHNhbGVzLnByaWNlU3VtIEZST00gb3JkZXJzLCBzYWxlcywgaW52ZW50b3J5LCB2ZW5kb3IgV0hFUkUgb3JkZXJzLnNhbGVzSWQgPSBzYWxlcy5zYWxlc0lkIEFORCBzYWxlcy52ZW5kb3JJZCA9IFwiICsgdGhpcy52ZW5kb3JJZCArIFwiIEFORCBvcmRlcnMub3JkZXJJZCA9IFwiICsgdGhpcy5kYXRhLmlkICsgXCIgQU5EIGludmVudG9yeS5pZCA9IHNhbGVzLnByb2R1Y3RJZFwiO1xuICAgICAgICAgICAgZGIuYWxsKHF1ZXJ5KS50aGVuKCByb3dzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlciA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHJvdyBpbiByb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RDb2RlXCI6IHJvd3Nbcm93XVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdE5hbWVcIjogcm93c1tyb3ddWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOiByb3dzW3Jvd11bMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RQcmljZVwiOiByb3dzW3Jvd11bM10sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaWNlU3VtXCI6IHJvd3Nbcm93XVs0XSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXIpXG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1BFTiBEQiBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUb3RhbCgpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgdG90YWxQcmljZSBGUk9NIG9yZGVycyBXSEVSRSBvcmRlcklkID0gXCIgKyB0aGlzLmRhdGEuaWQpLnRoZW4oIHJvd3MgPT4ge1xuICAgICAgICAgICAgZm9yKHZhciByb3cgaW4gcm93cykge1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWwgPSByb3dzW3Jvd11bMF07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50b3RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==