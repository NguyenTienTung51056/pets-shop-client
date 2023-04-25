import Header from "~/components/Layout/DefaultLayout/Header/Header";
import Footer from "~/components/Layout/DefaultLayout/Footer/Footer";
import Announcement from "~/components/Layout/DefaultLayout/Header/Announcement";

function DefaultLayout({ children }) {
  return (
   <div>
        <Announcement/>
        <Header />
            <main>
                {children}
            </main>
        <Footer />
   </div>
  );
}
export default DefaultLayout;