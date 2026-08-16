import { createContext, useContext, useState, type ReactNode } from 'react';

export type PaymentType = 'full' | 'plan';

export interface CartProgram {
  id: string;
  name: string;
  duration: string;
  paymentType: PaymentType;
  fullPrice: number;
  planAmount: number;
  planCount: number;
  planPeriod: string; // 'week' | 'month'
  planTotal: number;
}

interface CartContextValue {
  program: CartProgram | null;
  addProgram: (p: CartProgram) => void;
  removeProgram: () => void;
  updatePaymentType: (type: PaymentType) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [program, setProgram] = useState<CartProgram | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartContext.Provider
      value={{
        program,
        addProgram: (p) => {
          setProgram(p);
          setIsOpen(true);
        },
        removeProgram: () => setProgram(null),
        updatePaymentType: (type) =>
          setProgram((prev) => (prev ? { ...prev, paymentType: type } : null)),
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
