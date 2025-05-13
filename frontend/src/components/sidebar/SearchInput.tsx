import React from 'react'

type Props = {}

const SearchInput = (props: Props) => {
  return (
    <div>
      <form className='form'>
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