import React from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { removeItem, increase, decrease } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button
          className="remove-btn"
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        {/*액션 보내는 방법1*/}
        <button
          className="amount-btn"
          onClick={() => {
            dispatch(increase(id));
          }}
        >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className="amount">{amount}</p>
        {/* decrease amount */}
        {/*액션 보내는 방법1, 좀 더 알아보기 쉬움*/}
        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease({ id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
