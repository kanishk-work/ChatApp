import React from "react";
import { BiSearch } from "react-icons/bi";
import { Styles, applyStyles } from "../../Utils/styleUtils";

interface SearchBarProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  searchBarStyles?: Styles; // Optional prop for custom styles
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  searchBarStyles,
}) => {
  const { className, style } = applyStyles(searchBarStyles);

  return (
    <div className={`relative ${className}`} style={style}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-sm dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] rounded focus:outline-none py-1 px-3 focus:shadow-lg"
        placeholder="Search..."
      />
      <BiSearch className="absolute right-3 top-2 text-[var(--text-secondary)]" />
    </div>
  );
};

export default SearchBar;
