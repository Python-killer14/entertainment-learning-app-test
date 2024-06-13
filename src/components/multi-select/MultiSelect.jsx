import React, { useEffect, useState } from "react";

function MultiSelect() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.trim() === "") {
        return;
      }
      try {
        const resp = await fetch(
          `https://dummyjson.com/users/search?q=${searchTerm}`
        );
        const data = await resp.json();
        setSuggestions(data.users);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchUsers();
  }, [searchTerm]);

  const handleOnClick = (user) => {
    setSelected([...selected, user]);
    setSearchTerm("");
  };

  const handleDeselect = (user) => {
    setSelected((prev) => prev.filter((s) => s.id !== user.id));
  };

  return (
    <div className="border-2 bg-gray-200 rounded-md py-4">
      <section className="max-w-">
        <h1>Multi Select</h1>
        <div className="relative flex items-center flex-wrap border-2 gap-2 border-gray-300">
          {/* Pills */}
          {/* Input with search suggestions */}
          {selected.map((s) => {
            return (
              <div className=" flex items-center gap-2 py-1 px-2 bg-lime-300 rounded-lg">
                <span>{s.firstName}</span>
                <span>{s.lastName}</span>
                <span
                  onClick={() => handleDeselect(s)}
                  className="cursor-pointer bg-gray-300 px-2 rounded-full  "
                >
                  X
                </span>
              </div>
            );
          })}

          <input
            className="text-xl max-w-[300px] w-full py-2 px-3 outline-none border-none bg-transparent "
            type="text"
            placeholder="Search a User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search suggestions */}
          <ul className="max-w-[300px] max-h-[300px] py-3 border shadow overflow-y-scroll list-none bg-[#fff] absolute top-12 ">
            {searchTerm.length > 0 &&
              suggestions?.map((user, indx) => {
                return (
                  <li
                    className=" cursor-pointer hover:bg-gray-100 px-2 py-2"
                    key={indx}
                    onClick={() => handleOnClick(user)}
                  >
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default MultiSelect;
