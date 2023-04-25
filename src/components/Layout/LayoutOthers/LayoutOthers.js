import Header from "~/components/Layout/LayoutOthers/Header/Header";
import Footer from "~/components/Layout/LayoutOthers/Footer/Footer";

function LayoutOthers({ children }) {
  return (
   <div>
        <Header />
            <main>
                {children}
            </main>
        <Footer />
   </div>
  );
}
export default LayoutOthers;