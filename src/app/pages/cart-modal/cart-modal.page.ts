import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product';
import { OrderInterface } from 'src/app/interfaces/order';
import { CreateOrderDto } from 'src/app/interfaces/dto/create-order-dto';
import { ModalController, AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  orderList: CreateOrderDto = new CreateOrderDto();
  constructor(private cartService: CartService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.orderList = this.cartService.getCurrentDetails();
  }
  decreaseItem(product: number) {
    this.cartService.deleteItem(product);
  }
  increaseItem(product: ProductInterface) {
    this.cartService.addToOrder(product);
  }
  removeItem(product: number) {
    this.cartService.removeItem(product);
  }
  getTotal() {
    let totalPrice = 0;
    this.orderList.details.forEach(item => {
      totalPrice = totalPrice + (item.price * item.quantity);
    });
    return totalPrice;
  }
  close() {
    this.modalCtrl.dismiss();
  }
  async checkout() {
    // Perfom PayPal or Stripe checkout process
    this.cartService.createOrder(this.orderList).subscribe(async () => {
      this.cartService.restartCartItemCount();
      const alert = await this.alertCtrl.create({
        header: 'Thanks for your Order!',
        message: 'We will deliver your food as soon as possible',
        buttons: ['OK']
      });
      alert.present().then(() => {
        this.modalCtrl.dismiss();
      });
    });
  }
}
