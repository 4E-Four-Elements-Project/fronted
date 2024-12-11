export interface HeaderProps {
  cartCount?: number;
  cart?: MenuItems[];
  link?: string;
  className?: string;
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
  menuId: string;
  orderId: string;
  orderLocked: false;
  paymentMethod: string;
  price: string;
  quantity: number;
  totalPrice: number;
  userId: string;
  status: string;
}

export interface OrderInformationResponse {
  data: GetOrderInformation[];
}
