import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../slices/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import TopProducts from "../components/topProducts";
import { useParams, unstable_HistoryRouter } from "react-router-dom";
import Paginate from "../components/pagination";
import Meta from "../components/meta";
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });
  return (
    <>
      <Meta title={keyword || "dukaan"} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          varient="danger"
          children={error?.data?.message || error.error}
        />
      ) : (
        <Container className="container-fluid mb-6">
          {!keyword && <TopProducts />}
          {data.products.length === 0 ? (
            <h1 className="text-center p-2">No Product Found</h1>
          ) : (
            <>
              <h1 className="text-center p-2">Latest Prdoucts</h1>
              <Row className="gx-5 gy-5">
                {data.products.map((product) => (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      )}
      {data !== undefined && <Paginate page={data.page} pages={data.pages} />}
    </>
  );
};

export default HomeScreen;
