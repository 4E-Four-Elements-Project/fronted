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
  ingredients?: [];
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
