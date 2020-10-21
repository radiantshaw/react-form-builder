import React, { forwardRef } from "react";

let builder = {};

builder.form = forwardRef(function(props, ref) {
  return (
    <form ref={ref}></form>
  );
});

builder.input = forwardRef(function(props, ref) {
  return (
    <input ref={ref} />
  );
});

builder.select = forwardRef(function(props, ref) {
  return (
    <select ref={ref}></select>
  );
});

builder.textarea = forwardRef(function(props, ref) {
  return (
    <textarea ref={ref} />
  );
});

export default builder;
