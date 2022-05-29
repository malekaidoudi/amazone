import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/cartScreen/CartScreen";
import SigninScreen from "./screens/signinScreen/SigninScreen";
import ShippingScreen from "./screens/shippingScreen/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
function App() {
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    cxtDispatch({ type: "DISCONNECT" });
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("userInfo");
  };
  return (
    <Router>
      <div className="d-flex flex-column container-site">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazone</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    // <h6 className="d-inline">
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                    // </h6>
                  )}
                </Link>
              </Nav>
              {/* essaye de changer */}
              {userInfo ? (
                <Nav className="me-right">
                  <NavDropdown title={userInfo.name} id="nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile User</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order history</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signOutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav className="me-right">
                  <Nav.Link
                    as={Link}
                    to="/signin"
                    style={{ paddingRight: "5px" }}
                  >
                    Sign In
                  </Nav.Link>
                  <Nav.Link disabled>/</Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/signup"
                    style={{ paddingLeft: "1px" }}
                  >
                    Sign Up
                  </Nav.Link>
                </Nav>
              )}
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-5">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/shopping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
