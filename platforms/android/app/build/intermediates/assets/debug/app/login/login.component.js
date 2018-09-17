"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var localStorage = require("nativescript-localstorage");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var Sqlite = require("nativescript-sqlite");
var LoginComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function LoginComponent(router) {
        var _this = this;
        this.router = router;
        this.salesId = 1;
        (new Sqlite("booth.db")).then(function (db) {
            _this.database = db;
            console.log("Success");
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.goToPrincipal = function () {
        if (this.loginCode !== undefined) {
            this.fetch();
        }
        else {
            var title = 'Oops 😅';
            var message = 'Entre el código de seguridad para continuar';
            var buttonTitle = 'OK';
            nativescript_fancyalert_1.TNSFancyAlert.showWarning(title, message, buttonTitle);
        }
    };
    LoginComponent.prototype.goToRegister = function () {
        this.router.navigate(["register"]);
    };
    LoginComponent.prototype.fetch = function () {
        var _this = this;
        this.database.all("SELECT * FROM vendor WHERE loginCode=" + this.loginCode).then(function (rows) {
            _this.vendor = [];
            console.log(rows.length);
            for (var row in rows) {
                _this.vendor.push({
                    "vendorId": rows[row][0],
                    "name": rows[row][1],
                    "loginCode": rows[row][2],
                    "email": rows[row][3]
                });
            }
            _this.validate(_this.vendor);
        }, function (error) {
            nativescript_fancyalert_1.TNSFancyAlert.showNotice('Cree una cuenta', ' No existen cuentas en este dispositivo, puede crear una presionando "Registrarme"', 'OK').then(function () {
                console.log("SELECT ERROR", error);
            });
        });
    };
    LoginComponent.prototype.validate = function (vendor) {
        if (vendor.length > 0) {
            if (this.loginCode === vendor[0].loginCode) {
                localStorage.setItem("vendor", vendor[0]);
                this.checkForSaleId();
                this.router.navigate(["main"], { clearHistory: true });
            }
            else {
                nativescript_fancyalert_1.TNSFancyAlert.showError('Información Incorrecta', ' No existe un usuario con este código.', 'OK');
            }
        }
        else {
            nativescript_fancyalert_1.TNSFancyAlert.showError('Información Incorrecta', ' No existe un usuario con este código.', 'OK');
        }
    };
    LoginComponent.prototype.checkForSaleId = function () {
        if (localStorage.getItem("salesId") == null) {
            localStorage.setItem("salesId", this.salesId);
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "login",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCx3REFBMEQ7QUFDMUQsbUVBQTZFO0FBSTdFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBUTVDO0lBTUksNklBQTZJO0lBQzdJLGlIQUFpSDtJQUNqSCx3QkFBb0IsTUFBd0I7UUFBNUMsaUJBT0M7UUFQbUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFIckMsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUl2QixDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUM1QixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVNLHNDQUFhLEdBQXBCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdEIsSUFBSSxPQUFPLEdBQUcsNkNBQTZDLENBQUM7WUFDNUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHVDQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNMLENBQUM7SUFFTSxxQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBRU0sOEJBQUssR0FBWjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNqRixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSix1Q0FBYSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxvRkFBb0YsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixNQUFNO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLHVDQUFhLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLHdDQUF3QyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RHLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSix1Q0FBYSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBQyx3Q0FBd0MsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNwRyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHVDQUFjLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxDQUFDO0lBQ0wsQ0FBQztJQXpFUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUN2QyxDQUFDO3lDQVM4Qix5QkFBZ0I7T0FSbkMsY0FBYyxDQTBFMUI7SUFBRCxxQkFBQztDQUFBLEFBMUVELElBMEVDO0FBMUVZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCAqIGFzIGxvY2FsU3RvcmFnZSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiO1xuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0JztcblxuaW1wb3J0IHsgVmVuZG9yIH0gZnJvbSBcIi4uL29iamVjdHMvdmVuZG9yXCI7XG5cbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibG9naW5cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vbG9naW4uY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIGRhdGFiYXNlOiBhbnk7XG4gICAgcHVibGljIHZlbmRvcjogQXJyYXk8VmVuZG9yPjtcbiAgICBwdWJsaWMgbG9naW5Db2RlOiBTdHJpbmc7XG4gICAgcHVibGljIHNhbGVzSWQ6IE51bWJlciA9IDE7XG4gICAgLy8gVGhpcyBwYXR0ZXJuIG1ha2VzIHVzZSBvZiBBbmd1bGFy4oCZcyBkZXBlbmRlbmN5IGluamVjdGlvbiBpbXBsZW1lbnRhdGlvbiB0byBpbmplY3QgYW4gaW5zdGFuY2Ugb2YgdGhlIEl0ZW1TZXJ2aWNlIHNlcnZpY2UgaW50byB0aGlzIGNsYXNzLiBcbiAgICAvLyBBbmd1bGFyIGtub3dzIGFib3V0IHRoaXMgc2VydmljZSBiZWNhdXNlIGl0IGlzIGluY2x1ZGVkIGluIHlvdXIgYXBw4oCZcyBtYWluIE5nTW9kdWxlLCBkZWZpbmVkIGluIGFwcC5tb2R1bGUudHMuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgKG5ldyBTcWxpdGUoXCJib290aC5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gZGI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NcIik7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1BFTiBEQiBFUlJPUlwiLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBnb1RvUHJpbmNpcGFsKCkge1xuICAgICAgICBpZiAodGhpcy5sb2dpbkNvZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRpdGxlID0gJ09vcHMg7aC97biFJztcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJ0VudHJlIGVsIGPDs2RpZ28gZGUgc2VndXJpZGFkIHBhcmEgY29udGludWFyJztcbiAgICAgICAgICAgIGxldCBidXR0b25UaXRsZSA9ICdPSyc7XG4gICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dXYXJuaW5nKHRpdGxlLCBtZXNzYWdlLGJ1dHRvblRpdGxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnb1RvUmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInJlZ2lzdGVyXCJdKVxuICAgIH1cblxuICAgIHB1YmxpYyBmZXRjaCgpIHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIHZlbmRvciBXSEVSRSBsb2dpbkNvZGU9XCIgKyB0aGlzLmxvZ2luQ29kZSkudGhlbihyb3dzID0+IHtcbiAgICAgICAgICAgIHRoaXMudmVuZG9yID0gW107XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyb3dzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgaW4gcm93cykge1xuICAgICAgICAgICAgICAgIHRoaXMudmVuZG9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcInZlbmRvcklkXCI6IHJvd3Nbcm93XVswXSxcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHJvd3Nbcm93XVsxXSxcbiAgICAgICAgICAgICAgICAgICAgXCJsb2dpbkNvZGVcIjogcm93c1tyb3ddWzJdLFxuICAgICAgICAgICAgICAgICAgICBcImVtYWlsXCI6IHJvd3Nbcm93XVszXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZSh0aGlzLnZlbmRvcik7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd05vdGljZSgnQ3JlZSB1bmEgY3VlbnRhJywgJyBObyBleGlzdGVuIGN1ZW50YXMgZW4gZXN0ZSBkaXNwb3NpdGl2bywgcHVlZGUgY3JlYXIgdW5hIHByZXNpb25hbmRvIFwiUmVnaXN0cmFybWVcIicsICdPSycpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGUodmVuZG9yKSB7XG4gICAgICAgIGlmICh2ZW5kb3IubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9naW5Db2RlID09PSB2ZW5kb3JbMF0ubG9naW5Db2RlKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ2ZW5kb3JcIiwgdmVuZG9yWzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRm9yU2FsZUlkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wibWFpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWV9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoJ0luZm9ybWFjacOzbiBJbmNvcnJlY3RhJywgJyBObyBleGlzdGUgdW4gdXN1YXJpbyBjb24gZXN0ZSBjw7NkaWdvLicsICdPSycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoJ0luZm9ybWFjacOzbiBJbmNvcnJlY3RhJywnIE5vIGV4aXN0ZSB1biB1c3VhcmlvIGNvbiBlc3RlIGPDs2RpZ28uJywnT0snKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjaGVja0ZvclNhbGVJZCgpe1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzYWxlc0lkXCIpID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2FsZXNJZFwiLCB0aGlzLnNhbGVzSWQpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==