import Image from "next/image";
import logo from "../../../../public/no_search.svg";
const EmptySearch = () => {
  return (
    <div className="flex flex-col gap-6 h-full items-center justify-center">
      <Image src={logo} alt="no search result" height={140} width={140} />
      <h3 className="font-semibold text-2xl">
        No result found. Please try searching again
      </h3>
    </div>
  );
};

export default EmptySearch;
