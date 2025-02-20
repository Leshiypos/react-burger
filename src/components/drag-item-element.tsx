import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { sortIngredients } from "../services/burger-constructor/actions";
import { Identifier } from "dnd-core";

const ItemTypes = {
  CARD: "card",
};

interface DragObject {
  id: string;
  index: number;
}
interface IDragItemElementProps {
  children: React.ReactNode;
  index: number;
  id: string;
}
interface CollectedProps {
  handlerId: Identifier | null;
}

export default function DragItemElement({
  children,
  index,
  id,
}: IDragItemElementProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [{ handlerId }, drop] = useDrop<DragObject, unknown, CollectedProps>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      //@ts-ignore
      dispatch(sortIngredients(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag<DragObject, unknown, unknown>({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
  });
  drag(drop(ref));
  return (
    <div ref={ref} data-handler-id={handlerId}>
      {children}
    </div>
  );
}
