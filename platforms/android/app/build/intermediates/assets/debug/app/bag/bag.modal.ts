import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';

@Component({
    selector: "modal",
    // templateUrl: "./bag.modal.html",
    template: `
    <StackLayout style="width: 100%; background-color: whitesmoke;">

        <GridLayout columns="110,*,110" style="width: 100%; height: 40vh; background-color: #39a32c; margin-bottom: 20px;">
            <Image src="res://cancel" width="30" height="30" col="0" style="margin-left: 0px;" (tap)="close('hola')"></Image>
            <Label col="1" text="Editar" textWrap="true" horizontalAlignment="center" verticalAlignment="center" style="color: white; font-size: 22px;"></Label>
        </GridLayout>

        <CardView style="width: 95%; background-color: whitesmoke; margin: 20px;">
            <StackLayout>
                <Label text="Editar la cantidad a vender de {{ name }}" textWrap="true" horizontalAlignment="center" style="font-size: 20px; color: black; padding: 10 10 10 10;"></Label>
                <TextField [(ngModel)]="quantity" text="{{ quantity }}" (returnPress)="save()" hint="Entrar Cantidad" style="font-size: 20px; border-width: 0 0 2 0; border-color: #39a32c; width: 70%; margin-bottom: 30px;"></TextField>
                <StackLayout style="padding-bottom: 20px;">
                    <Button style="width: 50%; border-radius: 50%; background-color: #39a32c; color: white;" text="Guardar Cambios" (tap)="edit()"></Button>
                    <Button style="width: 50%; border-radius: 50%; background-color: #db2b2b; color: white; margin: 10 10 10 10" text="Eliminar Producto" (tap)="delete()"></Button>
                </StackLayout>
            </StackLayout>
        </CardView>
    </StackLayout>
    `
})

export class ModalComponent implements OnInit {

    public name: String = "Maiz";
    public quantity: any;
    public price: String;
    public salesId: Number;
    public vendorId: Number;
    public productId: Number;
    public priceSum: Number;

    public response: any;

    public constructor(private params: ModalDialogParams) {
        this.name = this.params.context.details.name;
        this.quantity = this.params.context.details.quantity;
        this.price = this.params.context.details.price;
        this.salesId = this.params.context.details.salesId;
        this.vendorId = this.params.context.details.vendorId;
        this.productId = this.params.context.details.productId;
    }

    ngOnInit() {
    }

    public close(response) {
        this.params.closeCallback(response);
    }

    public edit() {
        this.priceSum = this.getPriceSum();
        this.updateQuantityToSale();
        this.close(this.response);
    }
    
    public delete() {
        this.response = {
            "response": "delete",
            "salesId": this.salesId,
            "vendorId": this.vendorId,
            "productId": this.productId
        }
        this.close(this.response);
    }

    public getPriceSum(): Number {
        if(isNaN(this.quantity)){
            let title = 'Entre un Número';
            let message = 'El valor entrado no es un valor numérico. Favor de entrar un numero.';
            let buttonTitle = 'OK';
            TNSFancyAlert.showError(title, message, buttonTitle);
        } else {
            let total = +this.quantity * +this.price;
            return total;
        }
    }

    public updateQuantityToSale() {
        this.response = {
            "response": "updated",
            "priceSum": this.priceSum,
            "quantity": this.quantity,
            "salesId": this.salesId,
            "vendorId": this.vendorId,
            "productId": this.productId
        };
    }
}