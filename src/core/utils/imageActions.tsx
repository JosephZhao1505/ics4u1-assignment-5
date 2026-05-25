import { BsCart2, BsCartFill } from "react-icons/bs";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { ICON_SIZE, type ImageAction, type ImageCell } from "@/core";

export const favoriteAction = (isFavorite: (image: ImageCell) => boolean, onToggleFavorite: (image: ImageCell) => void): ImageAction => ({
  active: isFavorite,
  icon: (active) =>
    active ? <HiHeart className="text-blue-500" size={ICON_SIZE} /> : <HiOutlineHeart className="text-white" size={ICON_SIZE} />,
  id: "favorite",
  onClick: onToggleFavorite,
  position: "left",
});

export const cartAction = (isInCart: (image: ImageCell) => boolean, onToggleCart: (image: ImageCell) => void): ImageAction => ({
  active: isInCart,
  icon: (active) =>
    active ? <BsCartFill className="text-blue-500" size={ICON_SIZE} /> : <BsCart2 className="text-white" size={ICON_SIZE} />,
  id: "cart",
  onClick: onToggleCart,
  position: "right",
});
