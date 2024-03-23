import React, { useReducer } from "react";

const Products = [
  { id: 1, name: "Product-1", price: 100, quantity: 0 },
  { id: 2, name: "Product-2", price: 200, quantity: 0 },
  { id: 3, name: "Product-3", price: 300, quantity: 0 },
  { id: 4, name: "Product-4", price: 500, quantity: 0 },
  { id: 5, name: "Product-4", price: 700, quantity: 0 },
];

function reducer(state, action) {
  if (action.type === "add") {
    let total = state.total;
    const updatedProducts = state.product.map((item) => {
      if (item.id === action.payLoad) {
        total += item.price;
        item.display = "block";
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    const quantity = state.quantity + 1;

    return {
      product: updatedProducts,
      total: total,
      quantity: quantity,
    };
  } else if (action.type === "remove") {
    let total = state.total;
    const updatedProducts = state.product.map((item) => {
      if (item.id === action.payLoad && item.quantity > 0) {
        total -= item.price;
        if (item.quantity == 1) {
          item.display = "none";
        }
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    const quantity = state.quantity > 0 ? state.quantity - 1 : 0;

    return {
      product: updatedProducts,
      total: total,
      quantity: quantity,
    };
  }

  return state;
}

const LandingScreen = () => {
  const [state, dispatch] = useReducer(reducer, {
    product: Products,
    total: 0,
    quantity: 0,
  });

  return (
    <div className="w-full h-screen flex justify-center items-center gap-20 ">
      <div className="w-5/12 bg-slate-600 flex flex-col justify-center items-center gap-10 py-10 text-2xl border-8 border-gray-300">
        {state.product.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-around gap-10 h-16 bg-slate-400 w-11/12 items-center"
            >
              <span>{item.name}</span>
              <span>{item.price}</span>
              <span className="flex justify-center gap-3">
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "remove", payLoad: item.id });
                  }}
                >
                  -
                </span>
                <span>{item.quantity}</span>
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "add", payLoad: item.id });
                  }}
                >
                  +
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-3/12 bg-slate-600  flex flex-col justify-center items-center gap-5 text-xl border-8 border-gray-300">
        <div className="flex justify-center flex-col items-center gap-5 pt-7 w-full">
          {state.product.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-around w-11/12 bg-slate-400 h-12 items-center"
              >
                <div>{item.name}</div>
                <div>
                  {item.quantity}X{item.price}
                </div>
              </div>
            );
          })}
        </div>
        <div className=" bg-slate-400 h-12 w-11/12 mt-10 flex justify-center items-center mb-5">
          <p>Total:{state.total}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
