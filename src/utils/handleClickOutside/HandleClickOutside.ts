export const handleClickOutside = (
  ref: React.RefObject<HTMLElement>,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Check for clicks outside of ref
  const clickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setToggle(false);
    }
  };

  return clickOutside;
};
