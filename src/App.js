import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Fragment } from "react";
import {privateRouters, publicRouters} from '~/routes/index'
import DefaultLayout from "~/components/Layout/DefaultLayout/DefaultLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
}

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
}

function App() {
  const currentUser = useSelector((state) => state.user);
  const user = currentUser?.currentUser;
  return (
    <BrowserRouter>

      <div className="App">
        <Routes>
            {/* authentication /orders and orderDetails */}
            {!user&&(<Route path="/orders" element={<Login/>} />)} 
            {!user&&(<Route path="/order/:id" element={<Login/>} />)}

            {/* not authentication */}
            {publicRouters.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout

                if (route.layout) {
                  Layout = route.layout
                }else if(route.layout===null){
                  Layout = Fragment
                }
              return <Route key={index} path={route.path} element={<Layout><Page/></Layout>} />
            })}


            {/* authentication /login and register */}
            {user?(privateRouters.map((route, index) => {
              return <Route key={index} path={route.path} element={<Home/>} />
            }))
            :(privateRouters.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout

                if (route.layout) {
                  Layout = route.layout
                }else if(route.layout===null){
                  Layout = Fragment
                }
              return <Route key={index} path={route.path} element={<Layout><Page/></Layout>} />
            }))}
        </Routes>
      </div>
    
    </BrowserRouter>
  );
}

export default App;
