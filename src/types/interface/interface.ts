export interface HeaderProps {
  cartCount?: number;
  cart?: MenuItems[];
  link?: string;
  className?: string;
}

export interface CartItem {
  id: string;    // eller number om id:t är en numerisk identifierare
  name: string;  // Namnet på varan
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
  ingredients?: [];
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
  menuId?: string;
  quantity: number;
}

export interface InventoryApiResponse {
  data: InventoryApi[];
}
