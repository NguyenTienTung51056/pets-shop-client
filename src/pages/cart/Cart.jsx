import { Add, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "~/responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "~/requestMethods";
import { deleteProduct,setQuantity } from "~/redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const KEY = 'pk_test_51LeaI7IuHSewh2y4PpvvzgkAXNPclgjtFCBZnN25ZyinDEqkOYG6kRvvFQys3Xo9Y7rqOAPcsLlHtRa3s50ejkFn00fhUQEJ9D'


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const DeleteButton = styled.button`
    Width: 40px;
    height: 40px;
    border:none;
    background-color: white;
`


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const onClickDelete = (id) => {
    dispatch(deleteProduct(id));
  }

  const handleQuantity = (type, id) => {
    dispatch(setQuantity({type,id}));
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success",{state: {
          stripeData: res.data,
          products: cart, }});
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>Giỏ hàng của bạn</Title>
        <Top>
          <Link to="/"> <TopButton>Tiếp tục mua hàng</TopButton></Link>
          <TopTexts>
          <Link style={{textDecorationLine:"inherit",cursor:"pointer",margin: "0px 10px",color:"black"}} to="/orders">Túi mua sắm(2)</Link>
             <Link style={{textDecorationLine:"inherit",cursor:"pointer",margin: "0px 10px",color:"black"}} to="/orders">Đơn hàng của bạn</Link>
          </TopTexts>
          <TopButton type="filled">Thanh toán ngay</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add  onClick={()=>handleQuantity('+',product._id)}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={()=>handleQuantity('-',product._id)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
                <DeleteButton onClick={()=>onClickDelete(product._id)}>X</DeleteButton>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>TÓM TẮT THEO THỨ TỰ</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Tổng phụ</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Dự tính vận chuyển</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Giảm giá vận chuyển</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng cộng</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {user ? (
            <StripeCheckout
              name="Pet Shop"
              image="https://cdnb.artstation.com/p/assets/images/images/011/471/281/large/don-marlon-galban-allfurlovedes.jpg?1529752811"
              billingAddress
              shippingAddress
              description={`Tổng cộng bạn phải thanh toán là $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
            ):(<p>Bạn cần đăng nhập để thanh toán</p>)}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
