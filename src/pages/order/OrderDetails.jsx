import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "~/requestMethods";
import { mobile } from "~/responsive";

const Container = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  border: 2.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 70vh;
  width: 95%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
`;

const WTop = styled.div`
  padding-bottom: 20px;
`;

const WBottomm = styled.div`
  display: flex;
  padding-top: 20px;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const WBottommLeft = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const WBottommCenter = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;
const WBottommRight = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const WBottommRightLeft = styled.div`
  flex: 2;
`;

const WBottommRightRight = styled.div`
  flex: 1;
`;

const W = styled.div`display: flex;
justify-content: center; align-items: center;

`;

const WTextTop = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const WTextBottom = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: bold;
`;
const Text = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;
const TextDetails = styled.p`
  font-weight: 200;
`;
const Img = styled.img`
  width: 80px;
  height: 80px;
`;

function OrderDetails() {
  const location = useLocation();
  const [order, setOrder] = useState([]);
  const orderId = location.pathname.split("/")[2];
  const userId = useSelector((state) => state.user.currentUser._id);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${userId}`);
        const order = res.data.find((order) => order._id === orderId);
        setOrder(order);
      } catch (err) {}
    };
    getOrders();
  }, [userId, orderId]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get("/products");
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [order]);

  return (
    <Container>
      <Wrapper>
        <WTop>
          <Title>Chi tiết đơn hàng</Title>
        </WTop>
        <WBottomm>
          <WBottommLeft>
            <Text>Thong tin chung:</Text>
            <hr />
            <WTextTop>
              
              <Text>Đơn hàng: </Text> <TextDetails> {order._id}</TextDetails>
            </WTextTop>
            <WTextTop>
              
              <Text>Ngày đặt hàng: </Text>
              <TextDetails> {order.createdAt}</TextDetails>
            </WTextTop>
            <WTextTop>
              
              <Text>Trạng thái: </Text>
              <TextDetails> {order.status}</TextDetails>
            </WTextTop>
          </WBottommLeft>
          <WBottommCenter>
            <WTextBottom>
              <Text>Địa chỉ giao hàng:</Text>
              <hr />
              <WTextTop>
                
                <Text> Thanh Pho:</Text>
                <TextDetails>{order.address?.city}</TextDetails>
              </WTextTop>
              <WTextTop>
                
                <Text> Quoc gia:</Text>
                <TextDetails>{order.address?.country}</TextDetails>
              </WTextTop>
              <WTextTop>
                
                <Text>Dia chi chi tiet: </Text>
                <TextDetails> {order.address?.line1}</TextDetails>
              </WTextTop>
              <WTextTop>
                
                <Text>Postal_Code: </Text>
                <TextDetails>{order.address?.postal_code}</TextDetails>
              </WTextTop>
              <WTextTop>
                
                <Text>Tong tien: </Text>
                <TextDetails>{order.amount} </TextDetails>
              </WTextTop>
            </WTextBottom>
          </WBottommCenter>
          <WBottommRight>
          <Text>Chi tiết san pham:</Text>
          <hr />
          {order.products?.map((product) => (
             <W>
            <WBottommRightLeft>
                  <WTextTop>
                    <Text>Title :</Text>
                    <TextDetails>
                      {
                        products.find((item) => item._id === product.productId)
                          ?.title
                      }
                    </TextDetails>
                  </WTextTop>

                  <WTextTop>
                    <Text>Gia :</Text>
                    <TextDetails>
                      {
                        products.find((item) => item._id === product.productId)
                          ?.price
                      }
                    </TextDetails>
                  </WTextTop>
                  <WTextTop>
                    <Text>So luong mua hang :</Text>
                    <TextDetails>{product.quantity}</TextDetails>
                  </WTextTop>
                  <hr />
            
            </WBottommRightLeft>
            <WBottommRightRight>
              <Img src=  {
                        products.find((item) => item._id === product.productId)
                          ?.img
                      }/>
            </WBottommRightRight>
            </W>
              ))}
          </WBottommRight>
        </WBottomm>
      </Wrapper>
    </Container>
  );
}

export default OrderDetails;
