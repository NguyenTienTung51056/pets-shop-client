import styled from "styled-components";
import { DataGrid,GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { userRequest } from "~/requestMethods";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";




const columns: GridColDef[] = [
  { field: '_id', headerName: 'Ma Id', width: 400 },
  { field: 'status', headerName: 'status', width: 200 },
  { field: 'createdAt', headerName: 'createdAt', width: 300 },
  {
    field:'id',headerName:'',width:200,renderCell:(params:GridValueGetterParams)=>{
      return(
        <Link to={`/order/${params.row._id}`}>
          <button className="productListEdit">Chi tiet</button>
        </Link>
      )
    }
  }
];



const Container = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 70vh;
  width: 90%;
  display: flex;
  justify-content: center;
    flex-direction: column;
`;
const Title = styled.h1`
  font-weight: 200;
`;

const Table = styled.div`
width: 100%;
height: 100%;
`


function Order() {
    const [orders, setOrders] = useState([]);
    const userId  = useSelector(state => state.user.currentUser._id);
    useEffect(() => {
        const getOrders = async () => {
            try {
            const res = await userRequest.get(`/orders/find/${userId}`);
            setOrders(res.data);
            console.log(res.data);
            } catch (err) {}
        };
        getOrders();
    }, [userId]);

  return (
    <Container>
      <Wrapper>
        <Title>Lich su giao dich</Title>
        <Table>
          <DataGrid
            getRowId={(row) => row._id}
            rows={orders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Table>
      </Wrapper>
    </Container>
  );
}

export default Order;
