import React, { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";
import GifSearch from "./GifSearch";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { gf, favourites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };
  useEffect(() => {
    fetchGifCategories();
  }, []);

  const handleToggleCategories = () => {
    setShowCategories((prev) => !prev);
    setShowMobileMenu(false);
  };

  const handleToggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
    setShowCategories(false);
  };

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="Giphy Logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>

        <div className="font-bold text-md flex gap-2 items-center">
          {/* render categories  */}
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name}
              to={`/${category.name_encoded}`}
              className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
            >
              {category.name}
            </Link>
          ))}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 hidden lg:block`}
            />
          </button>

          {favourites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favourites">Favourite Gif</Link>
            </div>
          )}

          <button onClick={handleToggleMobileMenu}>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => (
                <div key={category.name}>
                  <Link to={`/${category.name_encoded}`} className="font-bold">
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* search */}
      <GifSearch />
    </nav>
  );
};

export default Header;
