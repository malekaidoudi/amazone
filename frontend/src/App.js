import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/cartScreen/CartScreen";
import SigninScreen from "./screens/signinScreen/SigninScreen";
function App() {
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    user: { userInfo },
  } = state;
  const signOutHandler = () => {
    cxtDispatch({ type: "DISCONNECT", payload: null });
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
                  {cartItems.length > 0 && (
                    <h6 className="d-inline">
                      <Badge pill bg="danger">
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    </h6>
                  )}
                </Link>
              </Nav>
              {userInfo ? (
                <Nav className="me-right">
                  <NavDropdown title={userInfo.name} id="nav-dropdown">
                    <NavDropdown.Item eventKey="1">
                      Profile User
                      {/* <LinkContainer to="/profile"> */}
                      {/* Profile User */}
                      {/* </LinkContainer> */}
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="2">
                      {/* <LinkContainer to="/orderuser"> */}
                      Order history
                      {/* </LinkContainer> */}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="3" onClick={signOutHandler}>
                      Sign Out
                    </NavDropdown.Item>
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
{
  /* <Nav>
              <Nav.Link as={Link} to="/login" style={{ paddingRight: "5px" }}>
                Login
              </Nav.Link>
              <Nav.Link disabled>/</Nav.Link>
              <Nav.Link as={Link} to="/register" style={{ paddingLeft: "1px" }}>
                Register
              </Nav.Link>
            </Nav> */
}
