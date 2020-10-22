import React, { forwardRef, useContext } from "react";

import deriveName from "../utils/derive-name";

const FormBuilderContext = React.createContext();

function useDerivedName(name) {
  if (!name) return null;

  return deriveName([
    ...useContext(FormBuilderContext), name
  ]);
}

let builder = {};

builder.form = forwardRef(function(props, ref) {
  return (
    <form ref={ref}>
      <FormBuilderContext.Provider value={[props.name]}>
        { props.children }
      </FormBuilderContext.Provider>
    </form>
  );
});

builder.fields = function(props) {
  if (props.name) {
    var formContext =
      props.formName ? [props.formName] : [...useContext(FormBuilderContext)];
  } else {
    return props.children || null;
  }

  return (
    <FormBuilderContext.Provider
      value={[...formContext, props.name]}>
      { props.children }
    </FormBuilderContext.Provider>
  );
}

builder.input = forwardRef(function(props, ref) {
  return (
    <input ref={ref}
      name={useDerivedName(props.name)}
    />
  );
});

builder.select = forwardRef(function(props, ref) {
  return (
    <select ref={ref}
      name={useDerivedName(props.name)}>
      { props.children }
    </select>
  );
});

builder.textarea = forwardRef(function(props, ref) {
  return (
    <textarea ref={ref}
      name={useDerivedName(props.name)}
    />
  );
});

export default builder;
