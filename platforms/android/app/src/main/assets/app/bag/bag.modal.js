"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var ModalComponent = /** @class */ (function () {
    function ModalComponent(params) {
        this.params = params;
        this.name = "Maiz";
        this.name = this.params.context.details.name;
        this.quantity = this.params.context.details.quantity;
        this.price = this.params.context.details.price;
        this.salesId = this.params.context.details.salesId;
        this.vendorId = this.params.context.details.vendorId;
        this.productId = this.params.context.details.productId;
    }
    ModalComponent.prototype.ngOnInit = function () {
    };
    ModalComponent.prototype.close = function (response) {
        this.params.closeCallback(response);
    };
    ModalComponent.prototype.edit = function () {
        this.priceSum = this.getPriceSum();
        this.updateQuantityToSale();
        this.close(this.response);
    };
    ModalComponent.prototype.delete = function () {
        this.response = {
            "response": "delete",
            "salesId": this.salesId,
            "vendorId": this.vendorId,
            "productId": this.productId
        };
        this.close(this.response);
    };
    ModalComponent.prototype.getPriceSum = function () {
        if (isNaN(this.quantity)) {
            var title = 'Entre un Número';
            var message = 'El valor entrado no es un valor numérico. Favor de entrar un numero.';
            var buttonTitle = 'OK';
            nativescript_fancyalert_1.TNSFancyAlert.showError(title, message, buttonTitle);
        }
        else {
            var total = +this.quantity * +this.price;
            return total;
        }
    };
    ModalComponent.prototype.updateQuantityToSale = function () {
        this.response = {
            "response": "updated",
            "priceSum": this.priceSum,
            "quantity": this.quantity,
            "salesId": this.salesId,
            "vendorId": this.vendorId,
            "productId": this.productId
        };
    };
    ModalComponent = __decorate([
        core_1.Component({
            selector: "modal",
            // templateUrl: "./bag.modal.html",
            template: "\n    <StackLayout style=\"width: 100%; background-color: whitesmoke;\">\n\n        <GridLayout columns=\"110,*,110\" style=\"width: 100%; height: 40vh; background-color: #39a32c; margin-bottom: 20px;\">\n            <Image src=\"res://cancel\" width=\"30\" height=\"30\" col=\"0\" style=\"margin-left: 0px;\" (tap)=\"close('hola')\"></Image>\n            <Label col=\"1\" text=\"Editar\" textWrap=\"true\" horizontalAlignment=\"center\" verticalAlignment=\"center\" style=\"color: white; font-size: 22px;\"></Label>\n        </GridLayout>\n\n        <CardView style=\"width: 95%; background-color: whitesmoke; margin: 20px;\">\n            <StackLayout>\n                <Label text=\"Editar la cantidad a vender de {{ name }}\" textWrap=\"true\" horizontalAlignment=\"center\" style=\"font-size: 20px; color: black; padding: 10 10 10 10;\"></Label>\n                <TextField [(ngModel)]=\"quantity\" text=\"{{ quantity }}\" (returnPress)=\"save()\" hint=\"Entrar Cantidad\" style=\"font-size: 20px; border-width: 0 0 2 0; border-color: #39a32c; width: 70%; margin-bottom: 30px;\"></TextField>\n                <StackLayout style=\"padding-bottom: 20px;\">\n                    <Button style=\"width: 50%; border-radius: 50%; background-color: #39a32c; color: white;\" text=\"Guardar Cambios\" (tap)=\"edit()\"></Button>\n                    <Button style=\"width: 50%; border-radius: 50%; background-color: #db2b2b; color: white; margin: 10 10 10 10\" text=\"Eliminar Producto\" (tap)=\"delete()\"></Button>\n                </StackLayout>\n            </StackLayout>\n        </CardView>\n    </StackLayout>\n    "
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFnLm1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFnLm1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG1FQUE0RTtBQUM1RSxtRUFBNkU7QUEyQjdFO0lBWUksd0JBQTJCLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBVjdDLFNBQUksR0FBVyxNQUFNLENBQUM7UUFXekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDM0QsQ0FBQztJQUVELGlDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRU0sOEJBQUssR0FBWixVQUFhLFFBQVE7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLDZCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sK0JBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixVQUFVLEVBQUUsUUFBUTtZQUNwQixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUztTQUM5QixDQUFBO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLG9DQUFXLEdBQWxCO1FBQ0ksRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDckIsSUFBSSxLQUFLLEdBQUcsaUJBQWlCLENBQUM7WUFDOUIsSUFBSSxPQUFPLEdBQUcsc0VBQXNFLENBQUM7WUFDckYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHVDQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBRU0sNkNBQW9CLEdBQTNCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN6QixVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDekIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDOUIsQ0FBQztJQUNOLENBQUM7SUFqRVEsY0FBYztRQXpCMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLG1DQUFtQztZQUNuQyxRQUFRLEVBQUUsb2xEQW1CVDtTQUNKLENBQUM7eUNBY3FDLDJCQUFpQjtPQVozQyxjQUFjLENBa0UxQjtJQUFELHFCQUFDO0NBQUEsQUFsRUQsSUFrRUM7QUFsRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQsIFROU0ZhbmN5QWxlcnRCdXR0b24gfSBmcm9tICduYXRpdmVzY3JpcHQtZmFuY3lhbGVydCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm1vZGFsXCIsXG4gICAgLy8gdGVtcGxhdGVVcmw6IFwiLi9iYWcubW9kYWwuaHRtbFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPFN0YWNrTGF5b3V0IHN0eWxlPVwid2lkdGg6IDEwMCU7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XCI+XG5cbiAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cIjExMCwqLDExMFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogNDB2aDsgYmFja2dyb3VuZC1jb2xvcjogIzM5YTMyYzsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5cbiAgICAgICAgICAgIDxJbWFnZSBzcmM9XCJyZXM6Ly9jYW5jZWxcIiB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiBjb2w9XCIwXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogMHB4O1wiICh0YXApPVwiY2xvc2UoJ2hvbGEnKVwiPjwvSW1hZ2U+XG4gICAgICAgICAgICA8TGFiZWwgY29sPVwiMVwiIHRleHQ9XCJFZGl0YXJcIiB0ZXh0V3JhcD1cInRydWVcIiBob3Jpem9udGFsQWxpZ25tZW50PVwiY2VudGVyXCIgdmVydGljYWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiBzdHlsZT1cImNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOiAyMnB4O1wiPjwvTGFiZWw+XG4gICAgICAgIDwvR3JpZExheW91dD5cblxuICAgICAgICA8Q2FyZFZpZXcgc3R5bGU9XCJ3aWR0aDogOTUlOyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlOyBtYXJnaW46IDIwcHg7XCI+XG4gICAgICAgICAgICA8U3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJFZGl0YXIgbGEgY2FudGlkYWQgYSB2ZW5kZXIgZGUge3sgbmFtZSB9fVwiIHRleHRXcmFwPVwidHJ1ZVwiIGhvcml6b250YWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6IGJsYWNrOyBwYWRkaW5nOiAxMCAxMCAxMCAxMDtcIj48L0xhYmVsPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgWyhuZ01vZGVsKV09XCJxdWFudGl0eVwiIHRleHQ9XCJ7eyBxdWFudGl0eSB9fVwiIChyZXR1cm5QcmVzcyk9XCJzYXZlKClcIiBoaW50PVwiRW50cmFyIENhbnRpZGFkXCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGJvcmRlci13aWR0aDogMCAwIDIgMDsgYm9yZGVyLWNvbG9yOiAjMzlhMzJjOyB3aWR0aDogNzAlOyBtYXJnaW4tYm90dG9tOiAzMHB4O1wiPjwvVGV4dEZpZWxkPlxuICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBzdHlsZT1cInBhZGRpbmctYm90dG9tOiAyMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHN0eWxlPVwid2lkdGg6IDUwJTsgYm9yZGVyLXJhZGl1czogNTAlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMzlhMzJjOyBjb2xvcjogd2hpdGU7XCIgdGV4dD1cIkd1YXJkYXIgQ2FtYmlvc1wiICh0YXApPVwiZWRpdCgpXCI+PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gc3R5bGU9XCJ3aWR0aDogNTAlOyBib3JkZXItcmFkaXVzOiA1MCU7IGJhY2tncm91bmQtY29sb3I6ICNkYjJiMmI7IGNvbG9yOiB3aGl0ZTsgbWFyZ2luOiAxMCAxMCAxMCAxMFwiIHRleHQ9XCJFbGltaW5hciBQcm9kdWN0b1wiICh0YXApPVwiZGVsZXRlKClcIj48L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgPC9TdGFja0xheW91dD5cbiAgICAgICAgPC9DYXJkVmlldz5cbiAgICA8L1N0YWNrTGF5b3V0PlxuICAgIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgbmFtZTogU3RyaW5nID0gXCJNYWl6XCI7XG4gICAgcHVibGljIHF1YW50aXR5OiBhbnk7XG4gICAgcHVibGljIHByaWNlOiBTdHJpbmc7XG4gICAgcHVibGljIHNhbGVzSWQ6IE51bWJlcjtcbiAgICBwdWJsaWMgdmVuZG9ySWQ6IE51bWJlcjtcbiAgICBwdWJsaWMgcHJvZHVjdElkOiBOdW1iZXI7XG4gICAgcHVibGljIHByaWNlU3VtOiBOdW1iZXI7XG5cbiAgICBwdWJsaWMgcmVzcG9uc2U6IGFueTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5wYXJhbXMuY29udGV4dC5kZXRhaWxzLm5hbWU7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSB0aGlzLnBhcmFtcy5jb250ZXh0LmRldGFpbHMucXVhbnRpdHk7XG4gICAgICAgIHRoaXMucHJpY2UgPSB0aGlzLnBhcmFtcy5jb250ZXh0LmRldGFpbHMucHJpY2U7XG4gICAgICAgIHRoaXMuc2FsZXNJZCA9IHRoaXMucGFyYW1zLmNvbnRleHQuZGV0YWlscy5zYWxlc0lkO1xuICAgICAgICB0aGlzLnZlbmRvcklkID0gdGhpcy5wYXJhbXMuY29udGV4dC5kZXRhaWxzLnZlbmRvcklkO1xuICAgICAgICB0aGlzLnByb2R1Y3RJZCA9IHRoaXMucGFyYW1zLmNvbnRleHQuZGV0YWlscy5wcm9kdWN0SWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlZGl0KCkge1xuICAgICAgICB0aGlzLnByaWNlU3VtID0gdGhpcy5nZXRQcmljZVN1bSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVF1YW50aXR5VG9TYWxlKCk7XG4gICAgICAgIHRoaXMuY2xvc2UodGhpcy5yZXNwb25zZSk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBkZWxldGUoKSB7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSB7XG4gICAgICAgICAgICBcInJlc3BvbnNlXCI6IFwiZGVsZXRlXCIsXG4gICAgICAgICAgICBcInNhbGVzSWRcIjogdGhpcy5zYWxlc0lkLFxuICAgICAgICAgICAgXCJ2ZW5kb3JJZFwiOiB0aGlzLnZlbmRvcklkLFxuICAgICAgICAgICAgXCJwcm9kdWN0SWRcIjogdGhpcy5wcm9kdWN0SWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlKHRoaXMucmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcmljZVN1bSgpOiBOdW1iZXIge1xuICAgICAgICBpZihpc05hTih0aGlzLnF1YW50aXR5KSl7XG4gICAgICAgICAgICBsZXQgdGl0bGUgPSAnRW50cmUgdW4gTsO6bWVybyc7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICdFbCB2YWxvciBlbnRyYWRvIG5vIGVzIHVuIHZhbG9yIG51bcOpcmljby4gRmF2b3IgZGUgZW50cmFyIHVuIG51bWVyby4nO1xuICAgICAgICAgICAgbGV0IGJ1dHRvblRpdGxlID0gJ09LJztcbiAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKHRpdGxlLCBtZXNzYWdlLCBidXR0b25UaXRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG90YWwgPSArdGhpcy5xdWFudGl0eSAqICt0aGlzLnByaWNlO1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVF1YW50aXR5VG9TYWxlKCkge1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0ge1xuICAgICAgICAgICAgXCJyZXNwb25zZVwiOiBcInVwZGF0ZWRcIixcbiAgICAgICAgICAgIFwicHJpY2VTdW1cIjogdGhpcy5wcmljZVN1bSxcbiAgICAgICAgICAgIFwicXVhbnRpdHlcIjogdGhpcy5xdWFudGl0eSxcbiAgICAgICAgICAgIFwic2FsZXNJZFwiOiB0aGlzLnNhbGVzSWQsXG4gICAgICAgICAgICBcInZlbmRvcklkXCI6IHRoaXMudmVuZG9ySWQsXG4gICAgICAgICAgICBcInByb2R1Y3RJZFwiOiB0aGlzLnByb2R1Y3RJZFxuICAgICAgICB9O1xuICAgIH1cbn0iXX0=