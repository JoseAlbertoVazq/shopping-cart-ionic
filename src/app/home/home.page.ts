import { CartService } from './../services/cart.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../pages/cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { ProductInterface } from 'src/app/interfaces/product';
import { OrderInterface } from 'src/app/interfaces/order';
import { CreateOrderDto } from 'src/app/interfaces/dto/create-order-dto';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  order: OrderInterface;
  details = [];
  orderDto: CreateOrderDto = new CreateOrderDto();
  products: ProductInterface[] = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;
  constructor(private cartService: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe((products) => {
      this.products = products;
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  addToOrder(product: ProductInterface) {
    this.cartService.addToOrder(product);
    this.animateCSS('tada');
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }
}
