import React from "react";

let builder = {};

builder.form = function() {
  return (
    <form></form>
  );
}

builder.input = function() {
  return (
    <input />
  );
}

builder.select = function() {
  return (
    <select></select>
  );
}

builder.textarea = function() {
  return (
    <textarea />
  );
}

export default builder;
