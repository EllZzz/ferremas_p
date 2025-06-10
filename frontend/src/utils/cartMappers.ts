import type { CartItem } from '../context/CartContext';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const convertCartItemToOrderItem = (item: CartItem): OrderItem => ({
  id: item.idProduct,
  name: item.product_name,
  price: item.product_unitprice,
  quantity: item.quantity,
  image: item.product_img,
});
