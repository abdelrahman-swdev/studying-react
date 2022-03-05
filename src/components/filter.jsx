import React from "react";

const Filter = (props) => {
  const { types, OnFilterChanged, currentFilter } = props;
  return (
    <ul className="list-group">
      {types.map((type) => (
        <li
          key={type.id}
          className="list-group-item"
          style={{ cursor: "pointer" }}
          className={
            currentFilter === type.id
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => OnFilterChanged(type.id)}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
