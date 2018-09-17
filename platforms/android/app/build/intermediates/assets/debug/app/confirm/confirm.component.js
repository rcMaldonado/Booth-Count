"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var localStorage = require("nativescript-localstorage");
var Sqlite = require("nativescript-sqlite");
var ConfirmComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function ConfirmComponent(router) {
        this.router = router;
        this.salesId = localStorage.getItem("salesId");
    }
    ConfirmComponent.prototype.ngOnInit = function () {
    };
    ConfirmComponent.prototype.finishSale = function () {
        this.resetIsVisible();
    };
    ConfirmComponent.prototype.resetIsVisible = function () {
        var _this = this;
        (new Sqlite("booth.db")).then(function (db) {
            db.execSQL("UPDATE inventory SET isVisible=0 WHERE isVisible=1").then(function () {
                _this.database = db;
                // this.updateBalance();
                _this.router.navigate(["main"], { clearHistory: true });
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    };
    ConfirmComponent.prototype.updateBalance = function () {
        var _this = this;
        var query = "UPDATE inventory SET inventory.balance=" +
            "(inventory.balance - sales.quatityToSale) WHERE inventory.id=sales.productId AND sales.salesId=" + this.salesId;
        this.database.execSQL().then(function () {
            console.log("Balance actualizado");
            _this.salesId += 1;
            localStorage.setItem("salesId", _this.salesId);
        }, function (error) {
            console.log("UPDATE ERROR: ", error);
        });
    };
    ConfirmComponent = __decorate([
        core_1.Component({
            selector: "confirm",
            moduleId: module.id,
            templateUrl: "./confirm.component.html",
            styleUrls: ["./confirm.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], ConfirmComponent);
    return ConfirmComponent;
}());
exports.ConfirmComponent = ConfirmComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maXJtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBK0Q7QUFFL0Qsd0RBQTBEO0FBQzFELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBUTVDO0lBSUksNklBQTZJO0lBQzdJLGlIQUFpSDtJQUNqSCwwQkFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRixtQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVNLHFDQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSx5Q0FBYyxHQUFyQjtRQUFBLGlCQVlDO1FBWEcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDNUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxvREFBb0QsQ0FBQyxDQUFDLElBQUksQ0FBRTtnQkFDbkUsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLHdCQUF3QjtnQkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzNELENBQUMsRUFBRSxVQUFBLEtBQUs7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBYSxHQUFwQjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxLQUFLLEdBQUcseUNBQXlDO1lBQ2pELGlHQUFpRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDckgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUU7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ2xCLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF6Q1EsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN6QyxDQUFDO3lDQU84Qix5QkFBZ0I7T0FObkMsZ0JBQWdCLENBMEM1QjtJQUFELHVCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7QUExQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0ICogYXMgbG9jYWxTdG9yYWdlIGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCI7XG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImNvbmZpcm1cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY29uZmlybS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9jb25maXJtLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBkYXRhYmFzZTogYW55O1xuICAgIHB1YmxpYyBzYWxlc0lkOiBudW1iZXI7XG5cbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLigJlzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxuICAgIC8vIEFuZ3VsYXIga25vd3MgYWJvdXQgdGhpcyBzZXJ2aWNlIGJlY2F1c2UgaXQgaXMgaW5jbHVkZWQgaW4geW91ciBhcHDigJlzIG1haW4gTmdNb2R1bGUsIGRlZmluZWQgaW4gYXBwLm1vZHVsZS50cy5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICB0aGlzLnNhbGVzSWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNhbGVzSWRcIik7XG4gICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBmaW5pc2hTYWxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0SXNWaXNpYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0SXNWaXNpYmxlKCkge1xuICAgICAgICAobmV3IFNxbGl0ZShcImJvb3RoLmRiXCIpKS50aGVuKGRiID0+IHtcbiAgICAgICAgICAgIGRiLmV4ZWNTUUwoXCJVUERBVEUgaW52ZW50b3J5IFNFVCBpc1Zpc2libGU9MCBXSEVSRSBpc1Zpc2libGU9MVwiKS50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlQmFsYW5jZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1haW5cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9QRU4gREIgRVJST1JcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQmFsYW5jZSgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gXCJVUERBVEUgaW52ZW50b3J5IFNFVCBpbnZlbnRvcnkuYmFsYW5jZT1cIiArXG4gICAgICAgICAgICBcIihpbnZlbnRvcnkuYmFsYW5jZSAtIHNhbGVzLnF1YXRpdHlUb1NhbGUpIFdIRVJFIGludmVudG9yeS5pZD1zYWxlcy5wcm9kdWN0SWQgQU5EIHNhbGVzLnNhbGVzSWQ9XCIgKyB0aGlzLnNhbGVzSWQ7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuZXhlY1NRTCgpLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFsYW5jZSBhY3R1YWxpemFkb1wiKTtcbiAgICAgICAgICAgIHRoaXMuc2FsZXNJZCArPSAxO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYWxlc0lkXCIsIHRoaXMuc2FsZXNJZCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVVBEQVRFIEVSUk9SOiBcIiwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19