"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_cardview_1 = require("nativescript-cardview");
element_registry_1.registerElement('CardView', function () { return nativescript_cardview_1.CardView; });
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var productDetails_1 = require("../providers/productDetails/productDetails");
var Toast = require("nativescript-toasts");
var Sqlite = require("nativescript-sqlite");
var AddProductComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function AddProductComponent(router, pd) {
        var _this = this;
        this.router = router;
        this.pd = pd;
        this.products = ["Alimentos", "Abonos Granulares", "Abonos Solubles", "Reventa"];
        (new Sqlite("booth.db")).then(function (db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS inventory(id INTEGER PRIMARY KEY AUTOINCREMENT, productCode TEXT, productName TEXT, productCategory TEXT, productPrice TEXT, initialBalance INTEGER, balance INTEGER, isVisible INTEGER)").then(function (id) {
                _this.database = db;
                console.log("Success");
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
        // this.deleteInventory();
        this.prepareView();
    }
    AddProductComponent.prototype.ngOnInit = function () {
    };
    AddProductComponent.prototype.goBack = function () {
        this.router.back();
    };
    AddProductComponent.prototype.onchange = function (args) {
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
        this.productCategory = this.products[args.newIndex];
    };
    AddProductComponent.prototype.onopen = function () {
        console.log("Drop Down opened.");
    };
    AddProductComponent.prototype.onclose = function () {
        console.log("Drop Down closed.");
    };
    AddProductComponent.prototype.addProduct = function () {
        var _this = this;
        if (this.actionBarTitle === "Editar Producto") {
            this.updateProduct();
        }
        else {
            if (this.validate()) {
                this.database.all("SELECT * FROM inventory WHERE productCode=" + this.productCode).then(function (rows) {
                    _this.inventory = [];
                    for (var row in rows) {
                        _this.inventory.push({
                            "productId": rows[row][0],
                            "productCode": rows[row][1],
                            "productName": rows[row][2],
                            "productCategory": rows[row][3],
                            "productPrice": rows[row][4],
                            "initialBalance": rows[row][5],
                            "balance": rows[row][6],
                            "isVisible": rows[row][7]
                        });
                    }
                    console.log(_this.inventory);
                    if (_this.inventory.length > 0) {
                        var title = 'Producto Existente';
                        var message = "El producto que esta entrando existe. Escriba el código del producto en la "
                            + "barra de busqueda en la sección de inventario";
                        var buttonTitle = 'OK';
                        nativescript_fancyalert_1.TNSFancyAlert.showNotice(title, message, buttonTitle).then(function () {
                            _this.router.navigate(["inventario"], { clearHistory: true });
                        });
                    }
                    else {
                        _this.database.execSQL("INSERT INTO inventory (productCode, productName, productCategory, productPrice, initialBalance, balance, isVisible) VALUES (?, ?, ?, ?, ?, ?, ?)", [_this.productCode, _this.productName, _this.productCategory, _this.productPrice, _this.initialBalance, _this.initialBalance, 0]).then(function () {
                            var title = "Producto Añadido";
                            var message = "El producto ha sido añadido exitosamente. Si necesita editar su información lo puede hacer en " +
                                "la sección de inventario. Para vender el producto busquelo en la sección de ventas.";
                            var buttonTitle = "OK";
                            nativescript_fancyalert_1.TNSFancyAlert.showSuccess(title, message, buttonTitle).then(function () {
                                _this.router.navigate(["inventario"], { clearHistory: true });
                            });
                        }, function (error) {
                            console.log("INSERT ERROR", error);
                        });
                    }
                }, function (error) {
                    // let title = 'Producto No Existe 😔';
                    // let message = 'No existe un producto con este código.';
                    // let buttonTitle = 'OK';
                    // TNSFancyAlert.showNotice(title, message, buttonTitle).then(() => {
                    console.log("SELECT ERROR", error);
                    // });
                });
            }
            else {
                var title = 'Oops 😅';
                var message = 'Favor de llenar los campos para añadir el producto.';
                var buttonTitle = 'OK';
                nativescript_fancyalert_1.TNSFancyAlert.showWarning(title, message, buttonTitle);
            }
        }
    };
    AddProductComponent.prototype.validate = function () {
        var flag;
        if (this.productCode === undefined || this.productName === undefined ||
            this.productCategory === undefined || this.productPrice === undefined ||
            this.initialBalance === undefined) {
            flag = false;
        }
        else {
            flag = true;
        }
        return flag;
    };
    AddProductComponent.prototype.prepareView = function () {
        if (this.pd.title === "Añadir Producto") {
            this.actionBarTitle = this.pd.title;
            this.selectedIndex = 0;
            this.btnText = "Añadir";
        }
        else if (this.pd.title === "Editar Producto") {
            this.actionBarTitle = this.pd.title;
            this.productCode = this.pd.productDetails.productCode;
            this.productName = this.pd.productDetails.productName;
            this.productPrice = this.pd.productDetails.productPrice;
            this.initialBalance = this.pd.productDetails.initialBalance;
            this.btnText = "Editar";
            for (var i = 0; i < this.products.length; i++) {
                if (this.products[i] === this.pd.productDetails.productCategory) {
                    this.selectedIndex = i;
                    this.productCategory = this.products[this.selectedIndex];
                }
            }
        }
    };
    AddProductComponent.prototype.updateProduct = function () {
        var _this = this;
        var query = "UPDATE inventory SET productCode = " + this.productCode +
            ", productName='" + this.productName + "', productCategory='" + this.productCategory +
            "', productPrice=" + this.productPrice + ", initialBalance=" + this.initialBalance +
            ", balance=" + this.initialBalance + " WHERE id=" + this.pd.productDetails.productId;
        this.database.execSQL(query).then(function () {
            var message = "El " + _this.productName + " fue actualizado exitosamente";
            var toastOptions = { text: message, duration: Toast.DURATION.SHORT };
            Toast.show(toastOptions);
            _this.router.navigate(["inventario"]);
        }, function (error) {
            console.log("UPDATE ERROR", error);
        });
    };
    AddProductComponent.prototype.deleteInventory = function () {
        var _this = this;
        (new Sqlite("booth.db")).then(function (db) {
            db.execSQL("DROP TABLE inventory").then(function () {
                _this.database = db;
                console.log("Success");
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    };
    AddProductComponent = __decorate([
        core_1.Component({
            selector: "add-product",
            moduleId: module.id,
            templateUrl: "./add-product.component.html",
            styleUrls: ["./add-product.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, productDetails_1.ProductDetails])
    ], AddProductComponent);
    return AddProductComponent;
}());
exports.AddProductComponent = AddProductComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXByb2R1Y3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLXByb2R1Y3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELHNEQUErRDtBQUUvRCwwRUFBd0U7QUFDeEUsK0RBQWlEO0FBQ2pELGtDQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxnQ0FBUSxFQUFSLENBQVEsQ0FBQyxDQUFDO0FBQzVDLG1FQUE2RTtBQUc3RSw2RUFBNEU7QUFFNUUsMkNBQTZDO0FBRTdDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBUTVDO0lBa0JJLDZJQUE2STtJQUM3SSxpSEFBaUg7SUFDakgsNkJBQW9CLE1BQXdCLEVBQVUsRUFBa0I7UUFBeEUsaUJBY0M7UUFkbUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFnQjtRQUpqRSxhQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFLL0UsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDNUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxxTkFBcU4sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7Z0JBQ3JPLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNCLENBQUMsRUFBRSxVQUFBLEtBQUs7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENB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UCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDO3lDQXFCOEIseUJBQWdCLEVBQWMsK0JBQWM7T0FwQi9ELG1CQUFtQixDQXdML0I7SUFBRCwwQkFBQztDQUFBLEFBeExELElBd0xDO0FBeExZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgQ2FyZFZpZXcgfSBmcm9tICduYXRpdmVzY3JpcHQtY2FyZHZpZXcnO1xucmVnaXN0ZXJFbGVtZW50KCdDYXJkVmlldycsICgpID0+IENhcmRWaWV3KTtcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQsIFROU0ZhbmN5QWxlcnRCdXR0b24gfSBmcm9tICduYXRpdmVzY3JpcHQtZmFuY3lhbGVydCc7XG5cbmltcG9ydCB7IEludmVudG9yeSB9IGZyb20gXCIuLi9vYmplY3RzL2ludmVudG9yeS9pbnZlbnRvcnlcIjtcbmltcG9ydCB7IFByb2R1Y3REZXRhaWxzIH0gZnJvbSBcIi4uL3Byb3ZpZGVycy9wcm9kdWN0RGV0YWlscy9wcm9kdWN0RGV0YWlsc1wiO1xuXG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tIFwibmF0aXZlc2NyaXB0LXRvYXN0c1wiO1xuXG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImFkZC1wcm9kdWN0XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FkZC1wcm9kdWN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2FkZC1wcm9kdWN0LmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQWRkUHJvZHVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgXG4gICAgcHVibGljIGludmVudG9yeTogQXJyYXk8SW52ZW50b3J5PjtcblxuICAgIHB1YmxpYyBwcm9kdWN0Q29kZTogU3RyaW5nO1xuICAgIHB1YmxpYyBwcm9kdWN0TmFtZTogU3RyaW5nO1xuICAgIHB1YmxpYyBwcm9kdWN0Q2F0ZWdvcnk6IFN0cmluZztcbiAgICBwdWJsaWMgcHJvZHVjdFByaWNlOiBudW1iZXI7XG4gICAgcHVibGljIGluaXRpYWxCYWxhbmNlOiBOdW1iZXI7XG5cbiAgICBwdWJsaWMgYWN0aW9uQmFyVGl0bGU6IFN0cmluZztcbiAgICBwdWJsaWMgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyBidG5UZXh0OiBTdHJpbmc7XG5cbiAgICBwdWJsaWMgcHJvZHVjdHMgPSBbXCJBbGltZW50b3NcIiwgXCJBYm9ub3MgR3JhbnVsYXJlc1wiLCBcIkFib25vcyBTb2x1Ymxlc1wiLCBcIlJldmVudGFcIl07XG5cbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLigJlzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDigJlzIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBwZDogUHJvZHVjdERldGFpbHMpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJib290aC5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICBkYi5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgaW52ZW50b3J5KGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCwgcHJvZHVjdENvZGUgVEVYVCwgcHJvZHVjdE5hbWUgVEVYVCwgcHJvZHVjdENhdGVnb3J5IFRFWFQsIHByb2R1Y3RQcmljZSBURVhULCBpbml0aWFsQmFsYW5jZSBJTlRFR0VSLCBiYWxhbmNlIElOVEVHRVIsIGlzVmlzaWJsZSBJTlRFR0VSKVwiKS50aGVuKGlkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzXCIpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9QRU4gREIgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcy5kZWxldGVJbnZlbnRvcnkoKTtcblxuICAgICAgICB0aGlzLnByZXBhcmVWaWV3KCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIuYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbmNoYW5nZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgZnJvbSAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH1gKTtcblxuICAgICAgICB0aGlzLnByb2R1Y3RDYXRlZ29yeSA9IHRoaXMucHJvZHVjdHNbYXJncy5uZXdJbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIG9ub3BlbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJEcm9wIERvd24gb3BlbmVkLlwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25jbG9zZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJEcm9wIERvd24gY2xvc2VkLlwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkUHJvZHVjdCgpIHtcbiAgICAgICAgaWYodGhpcy5hY3Rpb25CYXJUaXRsZSA9PT0gXCJFZGl0YXIgUHJvZHVjdG9cIil7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlKCkpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBpbnZlbnRvcnkgV0hFUkUgcHJvZHVjdENvZGU9XCIgKyB0aGlzLnByb2R1Y3RDb2RlKS50aGVuKHJvd3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludmVudG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByb3cgaW4gcm93cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZlbnRvcnkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0SWRcIjogcm93c1tyb3ddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdENvZGVcIjogcm93c1tyb3ddWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdE5hbWVcIjogcm93c1tyb3ddWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdENhdGVnb3J5XCI6IHJvd3Nbcm93XVszXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RQcmljZVwiOiByb3dzW3Jvd11bNF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbml0aWFsQmFsYW5jZVwiOiByb3dzW3Jvd11bNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiYWxhbmNlXCI6IHJvd3Nbcm93XVs2XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlzVmlzaWJsZVwiOiByb3dzW3Jvd11bN11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW52ZW50b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW52ZW50b3J5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aXRsZSA9ICdQcm9kdWN0byBFeGlzdGVudGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBcIkVsIHByb2R1Y3RvIHF1ZSBlc3RhIGVudHJhbmRvIGV4aXN0ZS4gRXNjcmliYSBlbCBjw7NkaWdvIGRlbCBwcm9kdWN0byBlbiBsYSBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYXJyYSBkZSBidXNxdWVkYSBlbiBsYSBzZWNjacOzbiBkZSBpbnZlbnRhcmlvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnV0dG9uVGl0bGUgPSAnT0snO1xuICAgICAgICAgICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93Tm90aWNlKHRpdGxlLCBtZXNzYWdlLCBidXR0b25UaXRsZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaW52ZW50YXJpb1wiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIGludmVudG9yeSAocHJvZHVjdENvZGUsIHByb2R1Y3ROYW1lLCBwcm9kdWN0Q2F0ZWdvcnksIHByb2R1Y3RQcmljZSwgaW5pdGlhbEJhbGFuY2UsIGJhbGFuY2UsIGlzVmlzaWJsZSkgVkFMVUVTICg/LCA/LCA/LCA/LCA/LCA/LCA/KVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLnByb2R1Y3RDb2RlLCB0aGlzLnByb2R1Y3ROYW1lLCB0aGlzLnByb2R1Y3RDYXRlZ29yeSwgdGhpcy5wcm9kdWN0UHJpY2UsIHRoaXMuaW5pdGlhbEJhbGFuY2UsIHRoaXMuaW5pdGlhbEJhbGFuY2UsIDBdKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGUgPSBcIlByb2R1Y3RvIEHDsWFkaWRvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gXCJFbCBwcm9kdWN0byBoYSBzaWRvIGHDsWFkaWRvIGV4aXRvc2FtZW50ZS4gU2kgbmVjZXNpdGEgZWRpdGFyIHN1IGluZm9ybWFjacOzbiBsbyBwdWVkZSBoYWNlciBlbiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhIHNlY2Npw7NuIGRlIGludmVudGFyaW8uIFBhcmEgdmVuZGVyIGVsIHByb2R1Y3RvIGJ1c3F1ZWxvIGVuIGxhIHNlY2Npw7NuIGRlIHZlbnRhcy5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1dHRvblRpdGxlID0gXCJPS1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKHRpdGxlLCBtZXNzYWdlLCBidXR0b25UaXRsZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJpbnZlbnRhcmlvXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5TRVJUIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHRpdGxlID0gJ1Byb2R1Y3RvIE5vIEV4aXN0ZSDtoL3tuJQnO1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbWVzc2FnZSA9ICdObyBleGlzdGUgdW4gcHJvZHVjdG8gY29uIGVzdGUgY8OzZGlnby4nO1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgYnV0dG9uVGl0bGUgPSAnT0snO1xuICAgICAgICAgICAgICAgICAgICAvLyBUTlNGYW5jeUFsZXJ0LnNob3dOb3RpY2UodGl0bGUsIG1lc3NhZ2UsIGJ1dHRvblRpdGxlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdGl0bGUgPSAnT29wcyDtoL3tuIUnO1xuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJ0Zhdm9yIGRlIGxsZW5hciBsb3MgY2FtcG9zIHBhcmEgYcOxYWRpciBlbCBwcm9kdWN0by4nO1xuICAgICAgICAgICAgICAgIGxldCBidXR0b25UaXRsZSA9ICdPSyc7XG4gICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93V2FybmluZyh0aXRsZSwgbWVzc2FnZSwgYnV0dG9uVGl0bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlKCk6IEJvb2xlYW4ge1xuICAgICAgICBsZXQgZmxhZzogQm9vbGVhbjtcblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0Q29kZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvZHVjdE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0Q2F0ZWdvcnkgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb2R1Y3RQcmljZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxCYWxhbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfVxuXG4gICAgcHVibGljIHByZXBhcmVWaWV3KCkge1xuICAgICAgICBpZih0aGlzLnBkLnRpdGxlID09PSBcIkHDsWFkaXIgUHJvZHVjdG9cIil7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkJhclRpdGxlID0gdGhpcy5wZC50aXRsZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLmJ0blRleHQgPSBcIkHDsWFkaXJcIlxuICAgICAgICB9IGVsc2UgaWYodGhpcy5wZC50aXRsZSA9PT0gXCJFZGl0YXIgUHJvZHVjdG9cIikge1xuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbkJhclRpdGxlID0gdGhpcy5wZC50aXRsZVxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0Q29kZSA9IHRoaXMucGQucHJvZHVjdERldGFpbHMucHJvZHVjdENvZGU7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3ROYW1lID0gdGhpcy5wZC5wcm9kdWN0RGV0YWlscy5wcm9kdWN0TmFtZTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFByaWNlID0gdGhpcy5wZC5wcm9kdWN0RGV0YWlscy5wcm9kdWN0UHJpY2U7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxCYWxhbmNlID0gdGhpcy5wZC5wcm9kdWN0RGV0YWlscy5pbml0aWFsQmFsYW5jZTtcbiAgICAgICAgICAgIHRoaXMuYnRuVGV4dCA9IFwiRWRpdGFyXCI7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9kdWN0cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wcm9kdWN0c1tpXSA9PT0gdGhpcy5wZC5wcm9kdWN0RGV0YWlscy5wcm9kdWN0Q2F0ZWdvcnkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RDYXRlZ29yeSA9IHRoaXMucHJvZHVjdHNbdGhpcy5zZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlUHJvZHVjdCgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gXCJVUERBVEUgaW52ZW50b3J5IFNFVCBwcm9kdWN0Q29kZSA9IFwiICsgdGhpcy5wcm9kdWN0Q29kZSArIFxuICAgICAgICBcIiwgcHJvZHVjdE5hbWU9J1wiICsgdGhpcy5wcm9kdWN0TmFtZSArIFwiJywgcHJvZHVjdENhdGVnb3J5PSdcIiArIHRoaXMucHJvZHVjdENhdGVnb3J5ICsgXG4gICAgICAgIFwiJywgcHJvZHVjdFByaWNlPVwiICsgdGhpcy5wcm9kdWN0UHJpY2UgKyBcIiwgaW5pdGlhbEJhbGFuY2U9XCIgKyB0aGlzLmluaXRpYWxCYWxhbmNlICtcbiAgICAgICAgXCIsIGJhbGFuY2U9XCIgKyB0aGlzLmluaXRpYWxCYWxhbmNlICsgXCIgV0hFUkUgaWQ9XCIgKyB0aGlzLnBkLnByb2R1Y3REZXRhaWxzLnByb2R1Y3RJZDtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKHF1ZXJ5KS50aGVuICggKCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IFwiRWwgXCIgKyB0aGlzLnByb2R1Y3ROYW1lICsgXCIgZnVlIGFjdHVhbGl6YWRvIGV4aXRvc2FtZW50ZVwiO1xuICAgICAgICAgICAgbGV0IHRvYXN0T3B0aW9uczogVG9hc3QuVG9hc3RPcHRpb25zID0geyB0ZXh0OiBtZXNzYWdlLCBkdXJhdGlvbjogVG9hc3QuRFVSQVRJT04uU0hPUlQgfTtcbiAgICAgICAgICAgIFRvYXN0LnNob3codG9hc3RPcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImludmVudGFyaW9cIl0pO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVQREFURSBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVJbnZlbnRvcnkoKXtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJib290aC5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICBkYi5leGVjU1FMKFwiRFJPUCBUQUJMRSBpbnZlbnRvcnlcIikudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIik7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1BFTiBEQiBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=