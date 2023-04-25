import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "~/requestMethods";


const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.products;
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const [orderId, setOrderId] = useState(null);


  const goHome = () => {
    navigate("/");
  }

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? (<p style={{color:"green"}}>Đã thanh toán thành công. mã đơn hàng của bạn là ${orderId}</p>)
        : `Thành công. Đơn hàng của bạn đang được xử lý... , Bạn cần đăng nhập để hoàn thành đơn hàng, và xem lại đơn hàng!`}
      <button onClick={goHome} style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;
