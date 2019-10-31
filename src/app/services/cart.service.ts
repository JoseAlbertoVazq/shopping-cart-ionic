import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductInterface } from 'src/app/interfaces/product';
import { OrderInterface } from 'src/app/interfaces/order';
import { CreateOrderDto } from 'src/app/interfaces/dto/create-order-dto';

const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderDto: CreateOrderDto = new CreateOrderDto();
  cartItemCount = new BehaviorSubject(0);
  constructor(private http: HttpClient) { }

  getCartItemCount() {
    return this.cartItemCount;
  }
  restartCartItemCount() {
    this.cartItemCount.next(0);
  }
  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${apiUrl}/products`);
  }
  createOrder(order: CreateOrderDto) {
    return this.http.post<CreateOrderDto>(`${apiUrl}/orders`, order.details);
  }
  getProductFilterByName(name: string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${apiUrl}/products/search?name=${name}`);
  }
  getOrderDetails(id: number): Observable<OrderInterface> {
    return this.http.get<OrderInterface>(`${apiUrl}/orders/details/${id}`);
  }

  getCurrentDetails() {
    return this.orderDto;
  }

  addToOrder(product: ProductInterface) {
    if (!this.orderDto.details) {
      this.orderDto.details = [];
    }
    if (this.orderDto.details.length !== 0) {
      let found = false;
      this.orderDto.details.forEach(item => {
        if (item.id === product.id) {
          found = true;
          item.quantity++;
          this.updateItemCount(+1);
        }
      });
      if (!found) {
        const newProduct: OrderInterface = new OrderInterface();
        newProduct.id = product.id;
        newProduct.name = product.name;
        newProduct.price = product.price;
        newProduct.quantity = 1;
        this.orderDto.details.push(newProduct);
        this.updateItemCount(+1);
      }
    } else {
      const newProduct: OrderInterface = new OrderInterface();
      newProduct.id = product.id;
      newProduct.name = product.name;
      newProduct.price = product.price;
      newProduct.quantity = 1;
      this.orderDto.details.push(newProduct);
      this.updateItemCount(+1);
    }
  }

  deleteItem(product: number) {
    this.orderDto.details.forEach(item => {
      if (item.id === product) {
        item.quantity--;
        this.updateItemCount(-1);
        if (item.quantity < 1) {
          this.orderDto.details.splice(this.orderDto.details.indexOf(item), 1);
        }
      }
    });
  }

  removeItem(product: number) {
    let quantityD = 0;
    this.orderDto.details.forEach(item => {
      if (item.id === product) {
        quantityD = item.quantity;
        this.orderDto.details.splice(this.orderDto.details.indexOf(item), 1);
      }
    });
    this.updateItemCount(quantityD * -1);
  }

  updateItemCount(value: number) {
    const totalAmount = this.cartItemCount.value + value;
    this.cartItemCount.next(totalAmount);
  }
}
