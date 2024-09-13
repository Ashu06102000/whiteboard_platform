import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { participatantsAvatarProps } from "@/interface/interface";

// Function to get a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const isColorDark = (color: string) => {
  color = color.replace("#", "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128;
};

const AvatarComponent = ({
  userInfo,
  isCurrentUser,
}: {
  userInfo: participatantsAvatarProps | undefined;
  isCurrentUser?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [randomColor, setRandomColor] = useState<string>(() =>
    getRandomColor()
  );

  const Avatar = userInfo?.username;
  const AvatarHint = Avatar?.split("")[0].toUpperCase();
  const textColor = isColorDark(randomColor) ? "#fff" : "#000";

  useEffect(() => {
    setRandomColor(getRandomColor());
  }, [userInfo]);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundColor: randomColor,
          color: textColor,
        }}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-base font-medium border-slate-200 border-2 cursor-pointer"
      >
        {AvatarHint}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-10 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white rounded text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ zIndex: 10 }}
          >
            {userInfo?.username}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarComponent;
