export class PurchaseClass {

    serial_no : number;
    purchase_id : string;
    quantity : number;
    buyingprice : number;
    date : Date;

   product_name : string;
    vendor_name : string;



    constructor(x,y,z,w,p,a,b){
        this.serial_no = x;
        this.purchase_id = y;
        this.quantity = z;
        this.buyingprice = w;
        this.date = p;
        this.product_name = a;
        this.vendor_name = b;
    }
}