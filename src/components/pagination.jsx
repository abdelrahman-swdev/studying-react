import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { pagesCount, activePage, onPageChanged } = props;

  let linksCount = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {linksCount.map((el) => (
          <li
            key={el}
            className={activePage === el ? "page-item active" : "page-item"}
            onClick={() => onPageChanged(el)}
          >
            <button className="page-link">{el}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
