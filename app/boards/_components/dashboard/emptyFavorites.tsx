import Image from "next/image";
import logo from "../../../../public/favorite.svg";
const EmptyFavorite = () => {
  return (
    <div className="flex flex-col gap-6 h-full items-center justify-center">
      <Image src={logo} alt="no search result" height={140} width={140} />
      <h3 className="font-semibold text-2xl">
        No favorite boards found. Please try again by adding them to your
        favorites.
      </h3>
    </div>
  );
};

export default EmptyFavorite;
