import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <main className="container flex justify-center items-center mx-auto my-auto flex-col h-screen w-auto">
      <Helmet>
        <title>TechCart Store | Not Found</title>
        <meta
          name="description"
          content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!"
        />
        <meta
          name="keywords"
          content="tech, ecommerce, gadgets, electronics, shop, buy online"
        />
      </Helmet>
      <h1 className="text-4xl font-bold text-red-600">404: Not Found</h1>
      <p className="text-xl text-gray-700">
        The page you are looking for does not exist.
      </p>
      <p className="text-xl text-gray-700">
        Please check the URL or return to the homepage.
      </p>
      <div className="flex justify-center items-center">
        <button
          aria-label="Go to Home"
          className="animate-bounce m-5 rounded-xl text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 text-nowrap"
          onClick={handleClick}
        >
          Go to Home
        </button>
      </div>
    </main>
  );
};

export default NotFound;
