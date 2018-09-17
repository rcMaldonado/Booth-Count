"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var bag_modal_1 = require("./bag.modal");
var total_modal_1 = require("./total.modal");
var Toast = require("nativescript-toasts");
var localStorage = require("nativescript-localstorage");
var Sqlite = require("nativescript-sqlite");
var BagComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function BagComponent(router, modal, vcRef) {
        this.router = router;
        this.modal = modal;
        this.vcRef = vcRef;
        this.salesId = localStorage.getItem("salesId");
        this.getSales();
    }
    BagComponent.prototype.ngOnInit = function () {
    };
    BagComponent.prototype.ngAfterViewInit = function () {
        this.createOrders();
        console.log("SalesId is: ", this.salesId);
    };
    BagComponent.prototype.goBack = function () {
        this.router.navigate(["main"], { clearHistory: true });
    };
    BagComponent.prototype.onItemTap = function (args) {
        var _this = this;
        var index = args.index;
        var selectedItem = {
            "name": this.sales[index].productName,
            "quantity": this.sales[index].quantityToSale,
            "salesId": this.sales[index].salesId,
            "vendorId": this.sales[index].vendorId,
            "productId": this.sales[index].productId,
            "price": this.sales[index].price
        };
        var editModalOptions = {
            context: { details: selectedItem },
            fullscreen: false,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(bag_modal_1.ModalComponent, editModalOptions).then(function (data) {
            if (data.response === "updated") {
                _this.updateQuantityToSale(data.quantity, data.priceSum, data.salesId, data.vendorId, data.productId);
                _this.getSales();
            }
            else if (data.response === "delete") {
                _this.deleteSale(data.salesId, data.vendorId, data.productId);
                _this.getSales();
            }
        });
    };
    BagComponent.prototype.confirmSale = function () {
        var _this = this;
        var totalModalOptions = {
            context: { details: this.sales },
            fullscreen: false,
            viewContainerRef: this.vcRef,
        };
        this.modal.showModal(total_modal_1.TotalModalComponent, totalModalOptions).then(function (data) {
            if (data.response === "confirm") {
                _this.insertOrders(_this.salesId, data.total);
            }
            else if (data.response === "delete") {
                _this.emptyBag(_this.salesId);
            }
            else if (data.response === "cancel") {
                var title = "No Hay Productos";
                var message = "Para hacer una orden el bolso de contener productos a vender";
                var buttonText = "OK";
                nativescript_fancyalert_1.TNSFancyAlert.showWarning(title, message, buttonText).then(function () {
                    _this.router.navigate(["main"]);
                });
            }
        });
    };
    BagComponent.prototype.getSales = function () {
        var _this = this;
        (new Sqlite("booth.db")).then(function (db) {
            db.all("SELECT inventory.productCode, inventory.productName, sales.quantityToSale, inventory.productPrice, sales.priceSum, sales.salesId, sales.vendorId, sales.productId FROM sales, inventory WHERE sales.productId = inventory.id AND sales.salesId = " + _this.salesId).then(function (rows) {
                _this.sales = [];
                for (var row in rows) {
                    _this.sales.push({
                        "productCode": rows[row][0],
                        "productName": rows[row][1],
                        "quantityToSale": rows[row][2],
                        "price": rows[row][3],
                        "priceSum": rows[row][4],
                        "salesId": rows[row][5],
                        "vendorId": rows[row][6],
                        "productId": rows[row][7]
                    });
                }
                console.log(_this.sales);
                _this.database = db;
            }, function (error) {
                console.log("SELECT ERROR", error);
            });
        });
    };
    BagComponent.prototype.deleteSale = function (salesId, vendorId, productId) {
        var _this = this;
        this.database.execSQL("DELETE FROM sales WHERE salesId=" + salesId + " AND vendorId=" + vendorId + " AND productId=" + productId).then(function () {
            _this.database.execSQL("UPDATE inventory SET isVisible=0 WHERE id=" + productId).then(function () {
                var message = 'El Producto fue removido del bolso de ventas';
                var toastOptions = { text: message, duration: Toast.DURATION.SHORT };
                Toast.show(toastOptions);
            }, function (error) {
                console.log("UPDATE ERROR", error);
            });
        }, function (error) {
            console.log("DELETE ERROR: ", error);
        });
    };
    BagComponent.prototype.updateQuantityToSale = function (quantity, priceSum, salesId, vendorId, productId) {
        this.database.execSQL("UPDATE sales SET quantityToSale=" + quantity + ", priceSum=" + priceSum + " WHERE (salesId=" + salesId + ") AND (vendorId=" + vendorId + ") AND (productId=" + productId + ")").then(function () {
            console.log("Cantidad a vendor actializada");
        }, function (error) {
            console.log("UPDATE ERROR", error);
        });
    };
    BagComponent.prototype.emptyBag = function (salesId) {
        var _this = this;
        this.database.execSQL("DELETE FROM sales WHERE salesId=" + salesId).then(function () {
            _this.database.execSQL("UPDATE inventory SET isVisible=0").then(function () {
                var message = 'El Bolso de Ventas fue vaciado';
                var toastOptions = { text: message, duration: Toast.DURATION.SHORT };
                Toast.show(toastOptions);
                _this.router.navigate(["main"]);
            }, function (error) {
                console.log("UPDATE ERROR", error);
            });
        }, function (error) {
            console.log("DELETE ERROR: ", error);
        });
    };
    BagComponent.prototype.createOrders = function () {
        this.database.execSQL("CREATE TABLE IF NOT EXISTS orders(orderId INTEGER PRIMARY KEY AUTOINCREMENT, salesId INTEGER, totalPrice TEXT, FOREIGN KEY (salesId) REFERENCES sales(salesId) ON UPDATE CASCADE ON DELETE CASCADE)").then(function () {
            console.log("Success on creating orders");
        }, function (error) {
            console.log("CREATE TABLE ERROR", error);
        });
    };
    BagComponent.prototype.insertOrders = function (salesId, total) {
        var _this = this;
        this.database.execSQL("INSERT INTO orders (salesId, totalPrice) VALUES (?, ?)", [salesId, total]).then(function () {
            console.log("Insertados");
            _this.router.navigate(["confirm"]);
        }, function (error) {
            console.log("INSERT ERROR", error);
        });
    };
    BagComponent = __decorate([
        core_1.Component({
            selector: "bag",
            moduleId: module.id,
            templateUrl: "./bag.component.html",
            styleUrls: ["./bag.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, dialogs_1.ModalDialogService, core_1.ViewContainerRef])
    ], BagComponent);
    return BagComponent;
}());
exports.BagComponent = BagComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUY7QUFDbkYsc0RBQStEO0FBQy9ELG1FQUE2RTtBQUM3RSxtRUFBNkU7QUFDN0UseUNBQTZDO0FBQzdDLDZDQUFvRDtBQUVwRCwyQ0FBNkM7QUFDN0Msd0RBQTBEO0FBRzFELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBUzVDO0lBS0ksNklBQTZJO0lBQzdJLGlIQUFpSDtJQUNqSCxzQkFBb0IsTUFBd0IsRUFBVSxLQUF5QixFQUFVLEtBQXVCO1FBQTVGLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUM1RyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRiwrQkFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHNDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlDLENBQUM7SUFFTSw2QkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixJQUFJO1FBQXJCLGlCQTBCQztRQXpCRyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksWUFBWSxHQUFHO1lBQ2YsTUFBTSxFQUFFLElBQUks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RU0sbUNBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxxTUFBcU0sQ0FBQyxDQUFDLElBQUksQ0FBRTtZQUMvTixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFFLFVBQUEsS0FBSztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sbUNBQVksR0FBbkIsVUFBb0IsT0FBTyxFQUFFLEtBQUs7UUFBbEMsaUJBT0M7UUFORyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyx3REFBd0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBRztZQUNyRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNUpRLFlBQVk7UUFOeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7U0FDckMsQ0FBQzt5Q0FROEIseUJBQWdCLEVBQWlCLDRCQUFrQixFQUFpQix1QkFBZ0I7T0FQdkcsWUFBWSxDQTZKeEI7SUFBRCxtQkFBQztDQUFBLEFBN0pELElBNkpDO0FBN0pZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQsIFROU0ZhbmN5QWxlcnRCdXR0b24gfSBmcm9tICduYXRpdmVzY3JpcHQtZmFuY3lhbGVydCc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL2JhZy5tb2RhbFwiO1xuaW1wb3J0IHsgVG90YWxNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL3RvdGFsLm1vZGFsXCI7XG5cbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdHMnO1xuaW1wb3J0ICogYXMgbG9jYWxTdG9yYWdlIGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCI7XG5cblxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImJhZ1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9iYWcuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vYmFnLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQmFnQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcblxuICAgIHByaXZhdGUgZGF0YWJhc2U6IGFueTtcbiAgICBwdWJsaWMgc2FsZXM6IEFycmF5PGFueT47XG4gICAgcHVibGljIHNhbGVzSWQ6IE51bWJlcjtcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLigJlzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDigJlzIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHRoaXMuc2FsZXNJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2FsZXNJZFwiKTtcbiAgICAgICAgdGhpcy5nZXRTYWxlcygpO1xuICAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICAgICAgdGhpcy5jcmVhdGVPcmRlcnMoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTYWxlc0lkIGlzOiBcIiwgdGhpcy5zYWxlc0lkKTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1haW5cIl0sIHtjbGVhckhpc3Rvcnk6IHRydWV9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gYXJncy5pbmRleDtcbiAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHtcbiAgICAgICAgICAgIFwibmFtZVwiOiB0aGlzLnNhbGVzW2luZGV4XS5wcm9kdWN0TmFtZSxcbiAgICAgICAgICAgIFwicXVhbnRpdHlcIjogdGhpcy5zYWxlc1tpbmRleF0ucXVhbnRpdHlUb1NhbGUsXG4gICAgICAgICAgICBcInNhbGVzSWRcIjogdGhpcy5zYWxlc1tpbmRleF0uc2FsZXNJZCxcbiAgICAgICAgICAgIFwidmVuZG9ySWRcIjogdGhpcy5zYWxlc1tpbmRleF0udmVuZG9ySWQsXG4gICAgICAgICAgICBcInByb2R1Y3RJZFwiOiB0aGlzLnNhbGVzW2luZGV4XS5wcm9kdWN0SWQsXG4gICAgICAgICAgICBcInByaWNlXCI6IHRoaXMuc2FsZXNbaW5kZXhdLnByaWNlXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGVkaXRNb2RhbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb250ZXh0OiB7IGRldGFpbHM6IHNlbGVjdGVkSXRlbX0sXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTW9kYWxDb21wb25lbnQsIGVkaXRNb2RhbE9wdGlvbnMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBpZihkYXRhLnJlc3BvbnNlID09PSBcInVwZGF0ZWRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUXVhbnRpdHlUb1NhbGUoZGF0YS5xdWFudGl0eSwgZGF0YS5wcmljZVN1bSwgZGF0YS5zYWxlc0lkLCBkYXRhLnZlbmRvcklkLCBkYXRhLnByb2R1Y3RJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTYWxlcygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEucmVzcG9uc2UgPT09IFwiZGVsZXRlXCIpe1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlU2FsZShkYXRhLnNhbGVzSWQsIGRhdGEudmVuZG9ySWQsIGRhdGEucHJvZHVjdElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFNhbGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25maXJtU2FsZSgpIHtcbiAgICAgICAgbGV0IHRvdGFsTW9kYWxPcHRpb25zID0ge1xuICAgICAgICAgICAgY29udGV4dDogeyBkZXRhaWxzOiB0aGlzLnNhbGVzfSxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChUb3RhbE1vZGFsQ29tcG9uZW50LCB0b3RhbE1vZGFsT3B0aW9ucykudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGlmKGRhdGEucmVzcG9uc2UgPT09IFwiY29uZmlybVwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydE9yZGVycyh0aGlzLnNhbGVzSWQsIGRhdGEudG90YWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEucmVzcG9uc2UgPT09IFwiZGVsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5QmFnKHRoaXMuc2FsZXNJZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5yZXNwb25zZSA9PT0gXCJjYW5jZWxcIil7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGl0bGUgPSBcIk5vIEhheSBQcm9kdWN0b3NcIjtcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiUGFyYSBoYWNlciB1bmEgb3JkZW4gZWwgYm9sc28gZGUgY29udGVuZXIgcHJvZHVjdG9zIGEgdmVuZGVyXCI7XG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvblRleHQgPSBcIk9LXCI7XG4gICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93V2FybmluZyh0aXRsZSwgbWVzc2FnZSwgYnV0dG9uVGV4dCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1haW5cIl0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2FsZXMoKSB7XG4gICAgICAgIChuZXcgU3FsaXRlKFwiYm9vdGguZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIuYWxsKFwiU0VMRUNUIGludmVudG9yeS5wcm9kdWN0Q29kZSwgaW52ZW50b3J5LnByb2R1Y3ROYW1lLCBzYWxlcy5xdWFudGl0eVRvU2FsZSwgaW52ZW50b3J5LnByb2R1Y3RQcmljZSwgc2FsZXMucHJpY2VTdW0sIHNhbGVzLnNhbGVzSWQsIHNhbGVzLnZlbmRvcklkLCBzYWxlcy5wcm9kdWN0SWQgRlJPTSBzYWxlcywgaW52ZW50b3J5IFdIRVJFIHNhbGVzLnByb2R1Y3RJZCA9IGludmVudG9yeS5pZCBBTkQgc2FsZXMuc2FsZXNJZCA9IFwiICsgdGhpcy5zYWxlc0lkKS50aGVuKHJvd3MgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByb3cgaW4gcm93cykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0Q29kZVwiOiByb3dzW3Jvd11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3ROYW1lXCI6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicXVhbnRpdHlUb1NhbGVcIjogcm93c1tyb3ddWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmljZVwiOiByb3dzW3Jvd11bM10sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaWNlU3VtXCI6IHJvd3Nbcm93XVs0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2FsZXNJZFwiOiByb3dzW3Jvd11bNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZlbmRvcklkXCI6IHJvd3Nbcm93XVs2XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdElkXCI6IHJvd3Nbcm93XVs3XVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zYWxlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlU2FsZShzYWxlc0lkLCB2ZW5kb3JJZCwgcHJvZHVjdElkKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIkRFTEVURSBGUk9NIHNhbGVzIFdIRVJFIHNhbGVzSWQ9XCIgKyBzYWxlc0lkICsgXCIgQU5EIHZlbmRvcklkPVwiICsgdmVuZG9ySWQgKyBcIiBBTkQgcHJvZHVjdElkPVwiICsgcHJvZHVjdElkKS50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJVUERBVEUgaW52ZW50b3J5IFNFVCBpc1Zpc2libGU9MCBXSEVSRSBpZD1cIiArIHByb2R1Y3RJZCkudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJ0VsIFByb2R1Y3RvIGZ1ZSByZW1vdmlkbyBkZWwgYm9sc28gZGUgdmVudGFzJztcbiAgICAgICAgICAgICAgICBsZXQgdG9hc3RPcHRpb25zOiBUb2FzdC5Ub2FzdE9wdGlvbnMgPSB7IHRleHQ6IG1lc3NhZ2UsIGR1cmF0aW9uOiBUb2FzdC5EVVJBVElPTi5TSE9SVCB9O1xuICAgICAgICAgICAgICAgIFRvYXN0LnNob3codG9hc3RPcHRpb25zKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVQREFURSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJERUxFVEUgRVJST1I6IFwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVRdWFudGl0eVRvU2FsZShxdWFudGl0eSwgcHJpY2VTdW0sIHNhbGVzSWQsIHZlbmRvcklkLCBwcm9kdWN0SWQpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiVVBEQVRFIHNhbGVzIFNFVCBxdWFudGl0eVRvU2FsZT1cIiArIHF1YW50aXR5ICsgXCIsIHByaWNlU3VtPVwiICsgcHJpY2VTdW0gKyBcIiBXSEVSRSAoc2FsZXNJZD1cIiArIHNhbGVzSWQgKyBcIikgQU5EICh2ZW5kb3JJZD1cIiArIHZlbmRvcklkICsgXCIpIEFORCAocHJvZHVjdElkPVwiICsgcHJvZHVjdElkICsgXCIpXCIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW50aWRhZCBhIHZlbmRvciBhY3RpYWxpemFkYVwiKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVUERBVEUgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW1wdHlCYWcoc2FsZXNJZCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJERUxFVEUgRlJPTSBzYWxlcyBXSEVSRSBzYWxlc0lkPVwiICsgc2FsZXNJZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJVUERBVEUgaW52ZW50b3J5IFNFVCBpc1Zpc2libGU9MFwiKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJ0VsIEJvbHNvIGRlIFZlbnRhcyBmdWUgdmFjaWFkbyc7XG4gICAgICAgICAgICAgICAgbGV0IHRvYXN0T3B0aW9uczogVG9hc3QuVG9hc3RPcHRpb25zID0geyB0ZXh0OiBtZXNzYWdlLCBkdXJhdGlvbjogVG9hc3QuRFVSQVRJT04uU0hPUlQgfTtcbiAgICAgICAgICAgICAgICBUb2FzdC5zaG93KHRvYXN0T3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJtYWluXCJdKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVQREFURSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJERUxFVEUgRVJST1I6IFwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVPcmRlcnMoKSB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIG9yZGVycyhvcmRlcklkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCwgc2FsZXNJZCBJTlRFR0VSLCB0b3RhbFByaWNlIFRFWFQsIEZPUkVJR04gS0VZIChzYWxlc0lkKSBSRUZFUkVOQ0VTIHNhbGVzKHNhbGVzSWQpIE9OIFVQREFURSBDQVNDQURFIE9OIERFTEVURSBDQVNDQURFKVwiKS50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3Mgb24gY3JlYXRpbmcgb3JkZXJzXCIpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBUQUJMRSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnNlcnRPcmRlcnMoc2FsZXNJZCwgdG90YWwpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiSU5TRVJUIElOVE8gb3JkZXJzIChzYWxlc0lkLCB0b3RhbFByaWNlKSBWQUxVRVMgKD8sID8pXCIsIFtzYWxlc0lkLCB0b3RhbF0pLnRoZW4gKCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2VydGFkb3NcIik7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJjb25maXJtXCJdKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJTlNFUlQgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19