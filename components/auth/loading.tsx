import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DASHBOARD_CONSATANT } from "@/constants/constants";

const Loading = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen bg-black"
      initial={{ y: 0 }}
      animate={loadingPercentage === 100 ? { y: "-100vh" } : { y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="flex space-x-1 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.span
          className="text-4xl font-bold text-gray-500"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: "easeOut",
          }}
        >
          {DASHBOARD_CONSATANT.PROJECT_NAME}
        </motion.span>
      </motion.div>

      <motion.div
        className="absolute bottom-10 font-Newsreader italic left-10 text-8xl	 font-semibold text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {loadingPercentage}%
      </motion.div>
    </motion.div>
  );
};

export default Loading;
