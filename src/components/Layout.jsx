import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Bounce, ToastContainer } from "react-toastify";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
    return (
        <>
            <title>TechCart Store | Premium Tech Gadgets</title>
            <meta
                name="description"
                content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!"
            />
            <meta
                name="keywords"
                content="tech, ecommerce, gadgets, electronics, shop, buy online"
            />

            <ScrollToTop />
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />

            <Navbar />

            <main className="min-h-[80vh] bg-slate-50">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>

            <Footer />
        </>
    );
};

export default Layout;
