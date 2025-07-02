interface Api {
  base_url: string;
  ordersEndpoint: string;
  customersEndpoint: string;
}

// Create a constant with the actual values
export const API: Api = {
  // base_url: "https://admin-dashboard-gilt-omega.vercel.app/api",
  base_url: "http://localhost:3000/api",
  ordersEndpoint: "/orders",
  customersEndpoint: "/customers",
};

// Order interfaces
export interface Product {
  productId: {
    _id: string;
    name: string;
    productImages: string[];
    description: string;
    price: number;
    productDiscount: number;
    inStock: number;
    category: string;
    productId: number;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  quantity: number;
  _id: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  postalCode: number;
}

export interface PaymentInfo {
  paymentMethod: string;
  transactionId: number;
  billingPostalCode: number;
  paymentStatus: string;
}

export interface Order {
  orderId: number;
  status: string;
  orderDate: string;
  totalPrice: number;
  products: Product[];
  customer: CustomerResponse;
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  _id?: string;
}

export interface OrderResponse extends Order {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Customer interfaces
export interface Customer {
  customerId: number;
  customerImage?: string;
  customerName: string;
  customerEmail: string;
  numberOfOrders: number;
  total: number;
  tags: Array<"premium" | "new customer" | "inactive" | "frequent buyer">;
  _id?: string;
}

export interface CustomerResponse extends Customer {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Export the interface for type usage
export type { Api };
