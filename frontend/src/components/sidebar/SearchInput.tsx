import React from 'react'

type Props = {}

const SearchInput = (props: Props) => {
  return (
    <div>
      <form className='flex items-center gap-2'>
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered rounded-full"
        />

      </form>
    </div>
  );
}

export default SearchInput