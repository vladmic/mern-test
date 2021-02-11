import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const limitsArray = [
  {
    id: 0,
    limitNumber: 10,
  },
  {
    id: 1,
    limitNumber: 25,
  },
  {
    id: 2,
    limitNumber: 50,
  },
  {
    id: 3,
    limitNumber: 100,
  },
];

const Footer = ({ getAllTodos, totalPages, limit, page }) => {
  const pagination = Array.from({ length: totalPages }, (_, i) => i + 1);

  const onLimitChange = (limit) => {
    getAllTodos(1, limit);
  }

  return (
    <div className="mt-3 d-flex justify-content-between align-items-center">
      <Pagination aria-label="Page navigation">
        <PaginationItem>
          <PaginationLink
            first
            href="#"
            onClick={() => getAllTodos(1, limit)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            previous
            onClick={() => getAllTodos(page - 1, limit)}
          />
        </PaginationItem>
        {pagination.map((pageNumber) => (
          <PaginationItem
            key={pageNumber}
            active={pageNumber === page}
          >
            <PaginationLink
              href="#"
              active={pageNumber === page}
              onClick={() => getAllTodos(pageNumber, limit)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            next
            href="#"
            onClick={() => getAllTodos(page + 1, limit)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            last
            href="#"
            onClick={() => getAllTodos(totalPages, limit)}
          />
        </PaginationItem>
      </Pagination>
      <Pagination>
        {limitsArray.map(({ id, limitNumber}) => (
          <PaginationItem
            key={id}
            active={limit === limitNumber}
          >
            <PaginationLink
              href="#"
              active={limitNumber === limit}
              onClick={() => onLimitChange(limitNumber)}
            >
              {limitNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  );
};

export default memo(Footer);

Footer.propTypes = {
  getAllTodos: PropTypes.func,
}
