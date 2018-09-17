import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
    selector: "total",
    // templateUrl: "./bag.modal.html",
    template: `
    <StackLayout style="width: 100%; background-color: whitesmoke;">

        <GridLayout columns="110,*,110" style="width: 100%; height: 40vh; background-color: #39a32c; margin-bottom: 20px;">
            <Image src="res://cancel" width="30" height="30" col="0" style="margin-left: 0px;" (tap)="close('hola')"></Image>
            <Label col="1" text="Confirmar Venta" textWrap="true" horizontalAlignment="center" verticalAlignment="center" style="color: white; font-size: 22px;"></Label>
        </GridLayout>

        <CardView style="width: 95%; background-color: whitesmoke; margin: 20px;">
            <StackLayout>
                <Label text="El Total de la Venta es $ {{ total }}" textWrap="true" horizontalAlignment="center" style="font-size: 24px; color: black; padding: 10 10 10 10; font-weight: bold;"></Label>
                <StackLayout style="padding-bottom: 20px;">
                    <Button style="width: 50%; border-radius: 50%; background-color: #39a32c; color: white;" text="Confirmar Venta" (tap)="confirm()"></Button>
                    <Button style="width: 50%; border-radius: 50%; background-color: #db2b2b; color: white; margin: 10 10 10 10" text="Vaciar El Bolso" (tap)="emptyBag()"></Button>
                </StackLayout>
            </StackLayout>
        </CardView>
    </StackLayout>
    `
})

export class TotalModalComponent implements OnInit {

    public total: number;
    public sales: any = [];

    public response: any;

    public constructor(private params: ModalDialogParams) {
        this.sales = this.params.context.details;
    }

    ngOnInit() {
        console.log(this.sales);
        this.total = this.getTotal();
    }

    public close(response) {
        this.params.closeCallback(response);
    }

    public confirm() {
        if(this.total === 0){
            this.response = {
                "response": "cancel"
            };
            this.close(this.response);
        } else {
            this.response = {
                "response": "confirm",
                "total": this.total
            };
            this.close(this.response);
        }
    }

    public emptyBag() {
        this.response = {
            "response": "delete"
        };
        this.close(this.response);
    }

    public getTotal(): number {
        let priceTotal = 0;
        for(var i = 0; i < this.sales.length; i++){
            console.log(this.sales[i].priceSum);
            priceTotal += (+this.sales[i].priceSum);
        }
        return priceTotal;
    }
}