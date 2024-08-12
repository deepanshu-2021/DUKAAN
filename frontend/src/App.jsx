import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-bootstrap";
function App() {
  return (
    <div id="page-container">
      <Header />
      <Container id="content-wrap" className="m-10">
        <Row>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
