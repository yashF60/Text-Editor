import {
  CiTextAlignLeft,
  CiTextAlignCenter,
  CiTextAlignRight,
  CiTextAlignJustify,
} from "react-icons/ci";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { BiFontColor } from "react-icons/bi";
import { FaSquare } from "react-icons/fa";
import { RxFontBold, RxFontItalic, RxUnderline } from "react-icons/rx";
import { HiOutlineStrikethrough } from "react-icons/hi2";
import { IoMdLink, IoIosClose } from "react-icons/io";
import { BsCardImage } from "react-icons/bs";

export const Icons = {
  // Alignment Icons
  AlignLeft: CiTextAlignLeft,
  AlignCenter: CiTextAlignCenter,
  AlignRight: CiTextAlignRight,
  AlignJustify: CiTextAlignJustify,

  // List Icons
  UnorderedList: MdFormatListBulleted,
  OrderedList: MdFormatListNumbered,

  // Color Icons
  FontColor: BiFontColor,
  HighlightSquare: FaSquare,

  // Operations Icons
  Bold: RxFontBold,
  Italic: RxFontItalic,
  Underline: RxUnderline,
  Strikethrough: HiOutlineStrikethrough,

  // Meta Icons
  Link: IoMdLink,
  Image: BsCardImage,

  // Modal Icon
  Close: IoIosClose,
};
