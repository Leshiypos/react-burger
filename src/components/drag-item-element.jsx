import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { sortIngredients } from "../services/burger-constructor/actions";
import PropTypes from "prop-types";

const ItemTypes = {
  CARD: "card",
};

export default function DragItemElement({ children, index, id }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ handlerId }, drop] = useDrop({
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(sortIngredients(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
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

DragItemElement.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
