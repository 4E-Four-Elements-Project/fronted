export interface HeaderProps {
  link?: string;
  className?: string;
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
