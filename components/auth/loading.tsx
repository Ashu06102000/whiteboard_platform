import React from "react";
import { motion } from "framer-motion";
import { DASHBOARD_CONSATANT } from "@/constants/constants";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="flex space-x-1 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {DASHBOARD_CONSATANT.PROJECT_NAME.split("").map((letter, index) => (
          <motion.span
            key={index}
            className="text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="flex space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gray-400 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;
