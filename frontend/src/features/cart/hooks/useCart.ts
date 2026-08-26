import { useContext } from 'react';
import { CartContext, type CartContextType } from '../context/cartContext';

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
}