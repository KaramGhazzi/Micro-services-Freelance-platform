import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard: React.FC = () => {
  return (
    <div className="relative bg-white px-5 py-5 shadow-sm lg:rounded-2xl lg:p-8 lg:py-8">
      <motion.div
        animate={{ opacity: 0.25 }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 1,
        }}
        className="flex flex-col gap-5"
      >
        <div>
          <div className="h-12 w-12 rounded-xl bg-neutral-100"></div>
        </div>
        <div className="grow">
          <div className="h-5 rounded-xl bg-neutral-100"></div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-3 w-40 rounded-xl bg-neutral-100"></div>
          <div className="h-3 w-32 rounded-xl bg-neutral-100"></div>
          <div className="h-3 w-40 rounded-xl bg-neutral-100"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkeletonCard;
