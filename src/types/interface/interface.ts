export interface HeaderProps {
  link?: string;
  className?: string;
}

// export interface MenuItemProps {
//   itemName?: string | null;
//   itemDesc?: string | null;
//   itemPrice?: number | null;
//   itemCategory?: string | null;
// }

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
  // possibleToOrder: "string";
  // missingIngredients: [];
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
