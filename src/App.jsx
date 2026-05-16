import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./Components/Layout/Layout"
import Home from "./pages/Home/Home"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Brands from "./pages/Brands/Brands"
import Cart from "./pages/Cart/Cart"
import Categories from "./pages/Categories/Categories"
import CheckOut from "./pages/CheckOut/CheckOut"
import Login from "./pages/Login/Login"
import NotFound from "./pages/NotFound/NotFound"
import Orders from "./pages/Orders/Orders"
import SignUp from "./pages/SignUp/SignUp"
import WishList from "./pages/WishList/WishList"
import Products from "./pages/Products/Products"
import { ToastContainer } from "react-toastify"
import ProductContextProvider from "./Context/Products.context"
import CategoriesProvider from "./Context/Categories.context"
import AuthProvider from "./Context/Auth.context"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"
import CartProvider from "./Context/Cart.context"
import OfflineScreen from "./Components/OfflineScreen/OfflineScreen"
import Search from "./pages/Search/Search"
import Account from "./pages/Account/Account"
import Contact from "./pages/Contact/Contact"
import Privacy from "./pages/Privacy/Privacy"

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        {
          index: true, element: <Home />
        },
        {
          path: 'products', element: <Products />
        },
        {
          path: "brands", element: <Brands />
        },
        {
          path: "cart", element: <Cart />
        },
        {
          path: "categories", element: <Categories />
        },
        {
          path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute>
        },
        {
          path: "login", element: <Login />
        },
        {
          path: "*", element: <NotFound />
        },
        {
          path: "orders", element: <ProtectedRoute><Orders /></ProtectedRoute>
        },
        {
          path: "search", element: <Search />
        }, {
          path: "account", element: <ProtectedRoute><Account /></ProtectedRoute>
        },

        {
          path: "signup", element: <SignUp />
        },
        {
          path: "contact", element: <Contact />
        },

        {
          path: "privacy", element: <Privacy />
        },
        {
          path: "wishlist", element: <WishList />
        },

        {
          path: 'product/:id', element: <ProductDetails />
        }
      ]
    }
  ])

  return (
    <>
      <OfflineScreen>

        <AuthProvider>
          <CartProvider>
            <ProductContextProvider>
              <CategoriesProvider>
                <RouterProvider router={router} />
                <ToastContainer position="top-right" autoClose={3000} closeOnClick={true} />
              </CategoriesProvider>
            </ProductContextProvider>
          </CartProvider>

        </AuthProvider>
      </OfflineScreen>

    </>
  )
}

export default App
