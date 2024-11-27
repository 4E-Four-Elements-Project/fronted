export const handleClickOutside = (
  ref: React.RefObject<HTMLElement>,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const clickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setToggle(false);
    }
  };

  return clickOutside;
};
