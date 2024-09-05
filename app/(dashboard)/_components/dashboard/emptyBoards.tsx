import Image from "next/image";
import logo from "../../../../public/note.svg";
const EmptyBoards = () => {
  return (
    <div className="flex flex-col gap-6 h-full items-center justify-center">
      <Image src={logo} alt="no search result" height={140} width={140} />
      <h3 className="font-semibold text-2xl">
        No boards found. Please try by creating one.
      </h3>
    </div>
  );
};

export default EmptyBoards;
