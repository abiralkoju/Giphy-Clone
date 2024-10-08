import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gifs from "../Components/Gifs";

const contentType = ["gifs", "stickers", "texts"];

const Gif = () => {
  const [gif, setGif] = useState(null);
  const { slug, type } = useParams();
  const [relatedGifs, setRelatedGifs] = useState([]);

  const { gf } = GifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }

    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      {/* Sidebar*/}
      <div className="hidden sm:block">
        {gif?.user && (
          <div className="flex gap-1">
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className="h-14"
            />
            <div className="px-2">
              <div className="font-bold">{gif?.user?.display_name}</div>
              <div className="faded-text">{gif?.user?.username}</div>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif?.title}</div>
            <Gifs gif={gif} hover={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gif;
