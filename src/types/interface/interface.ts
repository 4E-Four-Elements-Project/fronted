export interface HeaderProps {
  link?: string;
}

export interface MenuItemProps {
  itemName?: string;
  itemDesc?: string;
  itemPrice?: number;
  // itemButton: () => void;
}

export interface MenuFilterProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
