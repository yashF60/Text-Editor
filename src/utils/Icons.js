// import {
//   CiTextAlignLeft,
//   CiTextAlignCenter,
//   CiTextAlignRight,
//   CiTextAlignJustify,
// } from "react-icons/ci";
// import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
// import { BiFontColor } from "react-icons/bi";
// import { FaSquare } from "react-icons/fa";
// import { RxFontBold, RxFontItalic, RxUnderline } from "react-icons/rx";
// import { HiOutlineStrikethrough } from "react-icons/hi2";
// import { IoMdLink, IoIosClose } from "react-icons/io";
// import { BsCardImage } from "react-icons/bs";

// export const Icons = {
//   // Alignment Icons
//   AlignLeft: CiTextAlignLeft,
//   AlignCenter: CiTextAlignCenter,
//   AlignRight: CiTextAlignRight,
//   AlignJustify: CiTextAlignJustify,

//   // List Icons
//   UnorderedList: MdFormatListBulleted,
//   OrderedList: MdFormatListNumbered,

//   // Color Icons
//   FontColor: BiFontColor,
//   HighlightSquare: FaSquare,

//   // Operations Icons
//   Bold: RxFontBold,
//   Italic: RxFontItalic,
//   Underline: RxUnderline,
//   Strikethrough: HiOutlineStrikethrough,

//   // Meta Icons
//   Link: IoMdLink,
//   Image: BsCardImage,

//   // Modal Icon
//   Close: IoIosClose,
// };

import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Pen,       // Replaces TextColor
  Square,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  Image,
  X
} from "lucide-react";

export const Icons = {
  // Alignment Icons
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,

  // List Icons
  UnorderedList: List,
  OrderedList: ListOrdered,

  // Color Icons
  FontColor: Pen, // Use Droplet as a color-related icon
  HighlightSquare: Square,

  // Operations Icons
  Bold,
  Italic,
  Underline,
  Strikethrough,

  // Meta Icons
  Link,
  Image,

  // Modal Icon
  Close: X,
};
