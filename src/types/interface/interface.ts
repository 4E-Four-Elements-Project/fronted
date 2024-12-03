export interface HeaderProps {
  link?: string;
  className?: string;
}

export interface MenuItemProps {
  itemName?: string | null;
  itemDesc?: string | null;
  itemPrice?: number | null;
  itemCategory?: string | null;
}

export interface MenuFilterProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ToggleModalProp {
  toggle: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MenuItems {
  menuId?: string;
  ingredients?: [];
  // possibleToOrder: "string";
  // missingIngredients: [];
}

export interface MenuApiResponse {
  data: { menu: MenuItems[] };
}
