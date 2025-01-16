import React from "react";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(totalPosts / postsPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <nav className="pagination-wrapper">
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination-item">
            <a href="#" onClick={()=>paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
