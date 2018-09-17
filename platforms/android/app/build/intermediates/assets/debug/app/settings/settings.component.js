"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var file_system_1 = require("file-system");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var localStorage = require("nativescript-localstorage");
var email = require("nativescript-email");
var router_1 = require("@angular/router");
var SettingsComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function SettingsComponent(_changeDetectionRef, router) {
        this._changeDetectionRef = _changeDetectionRef;
        this.router = router;
        this.folderName = "testFolder";
        this.fileName = "testFile";
        this.isItemVisible = false;
        this.vendor = localStorage.getItem("vendor");
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
            body: "Hello World"
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
        this.onCreateFile();
    };
    SettingsComponent.prototype.onCreateFile = function () {
        var _this = this;
        // >> fs-create-all-code
        var documents = file_system_1.knownFolders.documents();
        this.folder = documents.getFolder(this.folderName || "testFolder");
        this.file = this.folder.getFile((this.fileName || "testFile") + ".txt");
        this.file.writeText(this.fileTextContent || "some random content")
            .then(function (result) {
            console.log("El resultado es: ", result);
            _this.file.readText()
                .then(function (res) {
                _this.successMessage = "Successfully saved in " + _this.file.path;
                _this.writtenContent = res;
                _this.isItemVisible = true;
            });
        }).catch(function (err) {
            console.log(err);
        });
        // << fs-create-all-code
    };
    SettingsComponent.prototype.generateReport = function () {
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
    SettingsComponent.prototype.logout = function () {
        this.router.navigate(['login']);
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
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, router_1.Router])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStGO0FBRy9GLDJDQUF5RDtBQUN6RCw4REFBNEY7QUFFNUYsd0RBQTBEO0FBQzFELDBDQUE0QztBQUM1QywwQ0FBeUM7QUFRekM7SUFpQkksNklBQTZJO0lBQzdJLGlIQUFpSDtJQUNqSCwyQkFBb0IsbUJBQXNDLEVBQVUsTUFBYztRQUE5RCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWIzRSxlQUFVLEdBQVcsWUFBWSxDQUFDO1FBQ2xDLGFBQVEsR0FBVyxVQUFVLENBQUM7UUFLOUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFRbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFLRCwyQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbEIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDdkIsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixJQUFJLEVBQUUsYUFBYTtTQUN0QixDQUFBO0lBQ0wsQ0FBQztJQUVNLHFDQUFTLEdBQWhCO1FBQUEsaUJBVUM7UUFURyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUM1QixPQUFPLENBQUMs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WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQW9CMkMsd0JBQWlCLEVBQWtCLGVBQU07T0FuQnpFLGlCQUFpQixDQXdHN0I7SUFBRCx3QkFBQztDQUFBLEFBeEdELElBd0dDO0FBeEdZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQWN0aW9uSXRlbSB9IGZyb20gXCJ1aS9hY3Rpb24tYmFyXCI7XG5pbXBvcnQgeyBrbm93bkZvbGRlcnMsIEZpbGUsIEZvbGRlciB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcbmltcG9ydCAqIGFzIGxvY2FsU3RvcmFnZSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiO1xuaW1wb3J0ICogYXMgZW1haWwgZnJvbSBcIm5hdGl2ZXNjcmlwdC1lbWFpbFwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzZXR0aW5nc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9zZXR0aW5ncy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcblxuICAgIHByaXZhdGUgdmVuZG9yOiBhbnk7XG4gICAgcHJpdmF0ZSBuYW1lOiBTdHJpbmdcbiAgICBwcml2YXRlIGNvbXBvc2VPcHRpb25zOiBlbWFpbC5Db21wb3NlT3B0aW9ucztcblxuICAgIHB1YmxpYyBmb2xkZXJOYW1lOiBzdHJpbmcgPSBcInRlc3RGb2xkZXJcIjtcbiAgICBwdWJsaWMgZmlsZU5hbWU6IHN0cmluZyA9IFwidGVzdEZpbGVcIjtcbiAgICBwdWJsaWMgZmlsZVRleHRDb250ZW50OiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgc3VjY2Vzc01lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgd3JpdHRlbkNvbnRlbnQ6IHN0cmluZztcbiAgICBwdWJsaWMgaXNJdGVtVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGZpbGU6IEZpbGU7XG4gICAgcHVibGljIGZvbGRlcjogRm9sZGVyO1xuXG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy4oCZcyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw4oCZcyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICB0aGlzLnZlbmRvciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidmVuZG9yXCIpO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgICBwcml2YXRlIGRyYXdlcjogUmFkU2lkZURyYXdlcjtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLnZlbmRvci5uYW1lO1xuICAgICAgICB0aGlzLmNvbXBvc2VPcHRpb25zID0ge1xuICAgICAgICAgICAgdG86IFt0aGlzLnZlbmRvci5lbWFpbF0sXG4gICAgICAgICAgICBzdWJqZWN0OiBcIk5hdGl2ZXNjcmlwdCBFbWFpbFwiLFxuICAgICAgICAgICAgYm9keTogXCJIZWxsbyBXb3JsZFwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2VuZEVtYWlsKCkge1xuICAgICAgICBlbWFpbC5hdmFpbGFibGUoKS50aGVuKGF2YWlsYWJsZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlIHB1ZWRlIHBvciBlbWFpbDpcIiwgYXZhaWxhYmxlKTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBlbWFpbC5jb21wb3NlKHRoaXMuY29tcG9zZU9wdGlvbnMpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25DcmVhdGVGaWxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ3JlYXRlRmlsZSgpIHtcbiAgICAgICAgLy8gPj4gZnMtY3JlYXRlLWFsbC1jb2RlXG4gICAgICAgIGxldCBkb2N1bWVudHMgPSBrbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG4gICAgICAgIHRoaXMuZm9sZGVyID0gZG9jdW1lbnRzLmdldEZvbGRlcih0aGlzLmZvbGRlck5hbWUgfHwgXCJ0ZXN0Rm9sZGVyXCIpO1xuICAgICAgICB0aGlzLmZpbGUgPSB0aGlzLmZvbGRlci5nZXRGaWxlKCh0aGlzLmZpbGVOYW1lIHx8IFwidGVzdEZpbGVcIikgKyBcIi50eHRcIik7XG5cbiAgICAgICAgdGhpcy5maWxlLndyaXRlVGV4dCh0aGlzLmZpbGVUZXh0Q29udGVudCB8fCBcInNvbWUgcmFuZG9tIGNvbnRlbnRcIilcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbCByZXN1bHRhZG8gZXM6IFwiLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZS5yZWFkVGV4dCgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3NNZXNzYWdlID0gXCJTdWNjZXNzZnVsbHkgc2F2ZWQgaW4gXCIgKyB0aGlzLmZpbGUucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdHRlbkNvbnRlbnQgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSXRlbVZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyA8PCBmcy1jcmVhdGUtYWxsLWNvZGVcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2VuZXJhdGVSZXBvcnQoKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRHJhd2VyKCkge1xuICAgICAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xvc2VEcmF3ZXJUYXAoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSW5pY2lvKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ21haW4nXSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSW52ZW50YXJpbygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydpbnZlbnRhcmlvJ10pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b09yZGVuZXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnb3JkZW5lcyddKVxuICAgIH1cblxuICAgIHB1YmxpYyB0b0FqdXN0ZXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnc2V0dGluZ3MnXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnbG9naW4nXSk7XG4gICAgfVxufSJdfQ==