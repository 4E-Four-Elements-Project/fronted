export interface HeaderProps {
  link?: string;
  className?: string;
}

export interface MenuItemProps {
  itemName?: string;
  itemDesc?: string;
  itemPrice?: number;
  itemCategory?: string;
  // itemButton: () => void;
}

export interface MenuFilterProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ToggleModalProp {
  toggle: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

// export interface AddNewItemToMenu extends MenuItemProps {

// }
