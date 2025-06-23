import { type FormEvent,useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

import useConversationStore from "../../stores/useConversationStore";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { sideBarUsers, setSelectedConversation } = useConversationStore();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!search.trim()) {
      return toast.error("Please enter a search term");
    }

    // Search for user by name (case insensitive)
    const foundUser = sideBarUsers.find(user => user.name.toLowerCase().includes(search.toLowerCase()));

    if (foundUser) {
      setSelectedConversation(foundUser);
      setSearch(""); // Clear search finding
      toast.success(`Found ${foundUser.name}`);
    } else {
      toast.error(`No user found with name "${search}"`);
    }
  };
  
  return (
    <div>
      <form className="flex items-center gap-2" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input rounded-full bg-black_light"
        />
        <button 
          type="submit" 
          className="btn btn-circle bg-black_light text-gray-400" 
          aria-label="search"
        >
          <IoSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;