export interface HeaderProps {
  cartCount?: number;
  cart?: MenuItems[];
  link?: string;
  className?: string;
}

export interface CartItem {
  id: string; // eller number om id:t är en numerisk identifierare
  name: string; // Namnet på varan
  price: number; // Priset på varan
  quantity: number; // Antalet av varan i kundvagnen (om tillämpligt)
}

export interface MenuFilterProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ToggleModalProp {
  toggle: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FilterContextType {
  filter: string;
  changeFilter: (newFilter: string) => void;
}

export interface MenuItems {
  menuId?: string;
  ingredients?: string[];
  category?: string;
  description?: string;
  price: number;
  quantity?: number;
  cartId?: number;
}

export interface MenuApiResponse {
  data: { menu: MenuItems[] };
}

export interface InventoryApi {
  inventoryId?: string;
  quantity: number;
}

export interface InventoryApiResponse {
  data: InventoryApi[];
}

export interface ProtectedRoutes {
  children: React.ReactNode;
}

export interface GetOrderInformation {
  cartId: string;
  comment?: string;
  createdAt: string;
  menuId?: string;
  orderId: string;
  orderLocked: false;
  paymentMethod: string;
  price: string;
  quantity: number;
  totalPrice: number;
  userId: string;
  orderStatus: string;
  menuDetails: orderItems[];
}

export interface OrderInformationResponse {
  data: GetOrderInformation[];
}

export interface orderItems {
  menuId: string;
  quantity: number;
}

export interface GetOrderHistory {
  cartId: string;
  comment?: string;
  createdAt: string;
  menuId?: string;
  orderId: string;
  orderLocked: false;
  paymentMethod: string;
  price: string;
  quantity: number;
  totalPrice: number;
  userId: string;
  orderStatus: string;
  menuDetails: orderHistoryItems[];
}

export interface orderHistoryItems {
  menuId: string;
  quantity: number;
  cartId: string
  createdAt: string, 
  orderId: string, 
  orderLocked: boolean,
  paymentMethod: string,
  price: string,
  totalPrice: number,
  userId: string,
  orderStatus: string,
  comment: string
}
