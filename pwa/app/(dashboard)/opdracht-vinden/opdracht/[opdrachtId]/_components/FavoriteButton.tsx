import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import IconHeart from '@/app/_components/icons/IconHeart';
import IconHeartFill from '@/app/_components/icons/IconHeartFill';

interface AssignmentFavoriteButtonProps {
  initialIsActive?: boolean;
}

const AssignmentFavoriteButton: React.FC<AssignmentFavoriteButtonProps> = ({
  initialIsActive,
}) => {
  const [isActive, setIsActive] = useState(initialIsActive ?? false);
  const animation = useAnimation();

  const handleClick = async (e: any) => {
    e.preventDefault();
    setIsActive(!isActive);

    await animation.start({ scale: 1.25 });
    await animation.start({
      scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 20 },
    });
  };

  return (
    <motion.button
      className={`hover:text-primary-600 relative h-5 w-5 transform-gpu cursor-pointer transition-colors ${
        isActive ? 'text-primary-600' : 'text-neutral-400'
      }`}
      onClick={handleClick}
      animate={animation}
    >
      <i className="absolute -inset-2"></i>

      <IconHeart
        className={`absolute left-0 top-0 ${isActive ? 'opacity-0' : ''}`}
      />
      <IconHeartFill
        className={`text-primary-600 absolute left-0 top-0 ${
          isActive ? '' : 'opacity-0'
        }`}
      />
    </motion.button>
  );
};

export default AssignmentFavoriteButton;
