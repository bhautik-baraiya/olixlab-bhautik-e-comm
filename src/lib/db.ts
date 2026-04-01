// lib/db.ts
type User = {
  id: string;
  email: string;
  password: string;
};

type Order = {
  id: string;
  userId: string;
  stripeSessionId: string;
  amountTotal: number;
  customerEmail: string;
  status: string;
  items: { productId: string; qty: number; price: number }[];
  createdAt: Date;
};

export const users: User[] = [];
export const orders: Order[] = []; 