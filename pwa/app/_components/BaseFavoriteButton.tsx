import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import IconHeart from '@/app/_components/icons/IconHeart';
import IconHeartFill from '@/app/_components/icons/IconHeartFill';
import { useRemoveFavoriteMutation } from '@/graphql/mutations/users/removeFavorite.generated';
import { useAddFavoriteMutation } from '@/graphql/mutations/users/addFavorite.generated';

interface BaseFavoriteButtonProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  isButton?: boolean;
  assignmentId: number;
}

const BaseFavoriteButton: React.FC<BaseFavoriteButtonProps> = ({
  isActive,
  setIsActive,
  isButton,
  assignmentId,
}) => {
  const animation = useAnimation();
  const variables = { assignmentId: Number(assignmentId) };
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const handleClick = async (e: any) => {
    e.preventDefault();

    !isActive ? addFavorite({ variables }) : removeFavorite({ variables });

    setIsActive(!isActive);

    await animation.start({ scale: 1.2 });
    await animation.start({
      scale: 1,
      transition: { type: 'spring', stiffness: 500, damping: 20 },
    });
  };

  return (
    <div
      className={`
        hover:text-primary-600 relative shrink-0 transform-gpu cursor-pointer transition-colors
        ${isActive ? 'text-primary-600' : 'text-neutral-400'}
        ${
          isButton
            ? 'relative inline-flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-white text-sm font-semibold text-neutral-900 shadow-sm transition-all hover:bg-neutral-50'
            : 'h-5 w-5'
        } 
      `}
      onClick={handleClick}
    >
      <motion.div animate={animation} className="relative h-5 w-5">
        <i className="absolute -inset-2"></i>

        <IconHeart
          className={`absolute left-0 top-0 ${isActive ? 'opacity-0' : ''} `}
        />
        <IconHeartFill
          className={`text-primary-600 absolute left-0 top-0 ${
            isActive ? '' : 'opacity-0'
          }`}
        />
      </motion.div>
    </div>
  );
};

export default BaseFavoriteButton;
