import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "~/redux/apiCalls";
import { mobile } from "~/responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=600")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [success, setSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (name, username, email, password==="") {
            setError(true);
            setMessageError("Please fill in all fields");  
        } else if(password.length < 6) {
            setError(true);
            setMessageError("Password must be at least 6 characters");
        }else if(password !== comfirmPassword){
          setError(true);
          setMessageError("Password does not match");
          }  else {
            await register(dispatch, { name, username, email, password });
            setError(false);
            setSuccess(true);
           setMessageSuccess("Registration successful");
        }
    }

  return (
    <Container>
      <Wrapper>
        <Title>Tạo tài khoản</Title>
        <Form>
          <Input placeholder="name" onChange={(e)=>setName(e.target.value)}/>
          <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
          <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
          <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
          <Input type="password" placeholder="confirm password" onChange={(e)=>setComfirmPassword(e.target.value)}/>
          <Agreement>
          Bằng cách tạo tài khoản, tôi đồng ý với việc xử lý dữ liệu cá nhân của mình theo <b>CHÍNH SÁCH BẢO MẬT</b>
          </Agreement>
          <Button onClick={(e)=>{handleClick(e)}}>Tạo</Button>
          {error && <span style={{color: "red", marginTop: "10px"}}>{messageError}</span>}
          {success && <span style={{color: "green", marginTop: "10px"}}>{messageSuccess}<Link to="/login">Đăng nhập</Link></span>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
