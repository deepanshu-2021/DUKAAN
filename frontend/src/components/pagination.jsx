import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination className="m-4">
        {[...Array(pages).keys()].map((x) => {
          return (
            <LinkContainer
              key={x + 1}
              to={!isAdmin ? `/page/${x + 1}` : `/admin/products/${x + 1}`}
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
