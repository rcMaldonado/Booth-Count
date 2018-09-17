"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var TotalModalComponent = /** @class */ (function () {
    function TotalModalComponent(params) {
        this.params = params;
        this.sales = [];
        this.sales = this.params.context.details;
    }
    TotalModalComponent.prototype.ngOnInit = function () {
        console.log(this.sales);
        this.total = this.getTotal();
    };
    TotalModalComponent.prototype.close = function (response) {
        this.params.closeCallback(response);
    };
    TotalModalComponent.prototype.confirm = function () {
        if (this.total === 0) {
            this.response = {
                "response": "cancel"
            };
            this.close(this.response);
        }
        else {
            this.response = {
                "response": "confirm",
                "total": this.total
            };
            this.close(this.response);
        }
    };
    TotalModalComponent.prototype.emptyBag = function () {
        this.response = {
            "response": "delete"
        };
        this.close(this.response);
    };
    TotalModalComponent.prototype.getTotal = function () {
        var priceTotal = 0;
        for (var i = 0; i < this.sales.length; i++) {
            console.log(this.sales[i].priceSum);
            priceTotal += (+this.sales[i].priceSum);
        }
        return priceTotal;
    };
    TotalModalComponent = __decorate([
        core_1.Component({
            selector: "total",
            // templateUrl: "./bag.modal.html",
            template: "\n    <StackLayout style=\"width: 100%; background-color: whitesmoke;\">\n\n        <GridLayout columns=\"110,*,110\" style=\"width: 100%; height: 40vh; background-color: #39a32c; margin-bottom: 20px;\">\n            <Image src=\"res://cancel\" width=\"30\" height=\"30\" col=\"0\" style=\"margin-left: 0px;\" (tap)=\"close('hola')\"></Image>\n            <Label col=\"1\" text=\"Confirmar Venta\" textWrap=\"true\" horizontalAlignment=\"center\" verticalAlignment=\"center\" style=\"color: white; font-size: 22px;\"></Label>\n        </GridLayout>\n\n        <CardView style=\"width: 95%; background-color: whitesmoke; margin: 20px;\">\n            <StackLayout>\n                <Label text=\"El Total de la Venta es $ {{ total }}\" textWrap=\"true\" horizontalAlignment=\"center\" style=\"font-size: 24px; color: black; padding: 10 10 10 10; font-weight: bold;\"></Label>\n                <StackLayout style=\"padding-bottom: 20px;\">\n                    <Button style=\"width: 50%; border-radius: 50%; background-color: #39a32c; color: white;\" text=\"Confirmar Venta\" (tap)=\"confirm()\"></Button>\n                    <Button style=\"width: 50%; border-radius: 50%; background-color: #db2b2b; color: white; margin: 10 10 10 10\" text=\"Vaciar El Bolso\" (tap)=\"emptyBag()\"></Button>\n                </StackLayout>\n            </StackLayout>\n        </CardView>\n    </StackLayout>\n    "
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], TotalModalComponent);
    return TotalModalComponent;
}());
exports.TotalModalComponent = TotalModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG90YWwubW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b3RhbC5tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUEwQjVFO0lBT0ksNkJBQTJCLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBSjdDLFVBQUssR0FBUSxFQUFFLENBQUM7UUFLbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDN0MsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sbUNBQUssR0FBWixVQUFhLFFBQVE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLHFDQUFPLEdBQWQ7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDWixVQUFVLEVBQUUsUUFBUTthQUN2QixDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDWixVQUFVLEVBQUUsU0FBUztnQkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3RCLENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVNLHNDQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osVUFBVSxFQUFFLFFBQVE7U0FDdkIsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxzQ0FBUSxHQUFmO1FBQ0ksSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFqRFEsbUJBQW1CO1FBeEIvQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsbUNBQW1DO1lBQ25DLFFBQVEsRUFBRSx5M0NBa0JUO1NBQ0osQ0FBQzt5Q0FTcUMsMkJBQWlCO09BUDNDLG1CQUFtQixDQWtEL0I7SUFBRCwwQkFBQztDQUFBLEFBbERELElBa0RDO0FBbERZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0b3RhbFwiLFxuICAgIC8vIHRlbXBsYXRlVXJsOiBcIi4vYmFnLm1vZGFsLmh0bWxcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxTdGFja0xheW91dCBzdHlsZT1cIndpZHRoOiAxMDAlOyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1wiPlxuXG4gICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIxMTAsKiwxMTBcIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDQwdmg7IGJhY2tncm91bmQtY29sb3I6ICMzOWEzMmM7IG1hcmdpbi1ib3R0b206IDIwcHg7XCI+XG4gICAgICAgICAgICA8SW1hZ2Ugc3JjPVwicmVzOi8vY2FuY2VsXCIgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgY29sPVwiMFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6IDBweDtcIiAodGFwKT1cImNsb3NlKCdob2xhJylcIj48L0ltYWdlPlxuICAgICAgICAgICAgPExhYmVsIGNvbD1cIjFcIiB0ZXh0PVwiQ29uZmlybWFyIFZlbnRhXCIgdGV4dFdyYXA9XCJ0cnVlXCIgaG9yaXpvbnRhbEFsaWdubWVudD1cImNlbnRlclwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCIgc3R5bGU9XCJjb2xvcjogd2hpdGU7IGZvbnQtc2l6ZTogMjJweDtcIj48L0xhYmVsPlxuICAgICAgICA8L0dyaWRMYXlvdXQ+XG5cbiAgICAgICAgPENhcmRWaWV3IHN0eWxlPVwid2lkdGg6IDk1JTsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTsgbWFyZ2luOiAyMHB4O1wiPlxuICAgICAgICAgICAgPFN0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwiRWwgVG90YWwgZGUgbGEgVmVudGEgZXMgJCB7eyB0b3RhbCB9fVwiIHRleHRXcmFwPVwidHJ1ZVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiBzdHlsZT1cImZvbnQtc2l6ZTogMjRweDsgY29sb3I6IGJsYWNrOyBwYWRkaW5nOiAxMCAxMCAxMCAxMDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+PC9MYWJlbD5cbiAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTogMjBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBzdHlsZT1cIndpZHRoOiA1MCU7IGJvcmRlci1yYWRpdXM6IDUwJTsgYmFja2dyb3VuZC1jb2xvcjogIzM5YTMyYzsgY29sb3I6IHdoaXRlO1wiIHRleHQ9XCJDb25maXJtYXIgVmVudGFcIiAodGFwKT1cImNvbmZpcm0oKVwiPjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHN0eWxlPVwid2lkdGg6IDUwJTsgYm9yZGVyLXJhZGl1czogNTAlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZGIyYjJiOyBjb2xvcjogd2hpdGU7IG1hcmdpbjogMTAgMTAgMTAgMTBcIiB0ZXh0PVwiVmFjaWFyIEVsIEJvbHNvXCIgKHRhcCk9XCJlbXB0eUJhZygpXCI+PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG4gICAgICAgIDwvQ2FyZFZpZXc+XG4gICAgPC9TdGFja0xheW91dD5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgVG90YWxNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgdG90YWw6IG51bWJlcjtcbiAgICBwdWJsaWMgc2FsZXM6IGFueSA9IFtdO1xuXG4gICAgcHVibGljIHJlc3BvbnNlOiBhbnk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7XG4gICAgICAgIHRoaXMuc2FsZXMgPSB0aGlzLnBhcmFtcy5jb250ZXh0LmRldGFpbHM7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2FsZXMpO1xuICAgICAgICB0aGlzLnRvdGFsID0gdGhpcy5nZXRUb3RhbCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZShyZXNwb25zZSkge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uZmlybSgpIHtcbiAgICAgICAgaWYodGhpcy50b3RhbCA9PT0gMCl7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIFwicmVzcG9uc2VcIjogXCJjYW5jZWxcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIFwicmVzcG9uc2VcIjogXCJjb25maXJtXCIsXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOiB0aGlzLnRvdGFsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5jbG9zZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBlbXB0eUJhZygpIHtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHtcbiAgICAgICAgICAgIFwicmVzcG9uc2VcIjogXCJkZWxldGVcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNsb3NlKHRoaXMucmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUb3RhbCgpOiBudW1iZXIge1xuICAgICAgICBsZXQgcHJpY2VUb3RhbCA9IDA7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNhbGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2FsZXNbaV0ucHJpY2VTdW0pO1xuICAgICAgICAgICAgcHJpY2VUb3RhbCArPSAoK3RoaXMuc2FsZXNbaV0ucHJpY2VTdW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmljZVRvdGFsO1xuICAgIH1cbn0iXX0=