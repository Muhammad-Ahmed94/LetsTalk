import React, { type FormEvent } from "react";
import { IoSearch } from "react-icons/io5";

type Props = {};

const SearchInput = (props: Props) => {
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <div>
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered rounded-full"
        />
        <button type="submit" className="btn" onSubmit={handleFormSubmit} aria-label="search">
          <IoSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
