import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Product {
  idProduct: number;
  product_name: string;
  stock: number;
  product_unitprice: number;
  product_img: string;
  fk_category: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (idProduct: number) => void;
  updateQuantity: (idProduct: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.idProduct === product.idProduct);
      if (existing) {
        if (existing.quantity < product.stock) {
          return prev.map(item =>
            item.idProduct === product.idProduct
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prev;
      }
      if (product.stock > 0) {
        return [...prev, { ...product, quantity: 1 }];
      }
      return prev;
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.idProduct !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return removeFromCart(id);
    setCart(prev =>
      prev.map(item =>
        item.idProduct === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};
