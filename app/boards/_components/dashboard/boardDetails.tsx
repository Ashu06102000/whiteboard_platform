"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";

const BoardDetails = ({ id }: { id: Id<"boards"> }) => {
  const getbaord = useQuery(api.queries.boards.getBoardsById, { id: id });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex overflow-hidden">
      {getbaord ? (
        <motion.div
          className="flex"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="w-1/3" variants={variants}>
            <Image
              src={getbaord?.imageUrl as any}
              alt=""
              className="w-full h-full object-cover"
              width={50}
              height={50}
            />
          </motion.div>
          <motion.div
            className="w-2/3 p-4 flex flex-col gap-1"
            variants={variants}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-xl font-normal mb-2">{getbaord?.title}</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm font-light text-gray-500 min-w-24">
                Owner
              </span>
              <p className="text-sm font-normal text-black">
                {getbaord?.authorName}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-light text-gray-500 min-w-24">
                Created
              </span>
              <p className="text-sm font-normal text-black">
                {format(new Date(getbaord._creationTime), "MMM do, yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-light text-gray-500 min-w-24">
                Last modified
              </span>
              <p className="text-sm font-normal text-black">
                {format(new Date(getbaord.updatedAt), "MMM do, yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-light text-gray-500 min-w-24">
                Name
              </span>
              <p className="text-sm font-normal text-black">
                {getbaord?.title}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex">
          <div className="w-1/3 p-4">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <div className="w-2/3 p-4 flex flex-col gap-4">
            <Skeleton className="w-3/4 h-6 rounded-lg" />
            <Skeleton className="w-1/2 h-4 rounded-lg" />
            <Skeleton className="w-1/2 h-4 rounded-lg" />
            <Skeleton className="w-1/2 h-4 rounded-lg" />
            <Skeleton className="w-1/2 h-4 rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardDetails;
