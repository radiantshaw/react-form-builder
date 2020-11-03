import React, { forwardRef, useContext } from "react";

import deriveName from "../utils/derive-name";

const FormBuilderContext = React.createContext();

function useDerivedName(name, collection) {
  if (!name) return null;

  const formContext = [
    ...useContext(FormBuilderContext), name
  ];

  if (collection) {
    formContext.push('');
  }

  return deriveName(formContext);
}

let builder = {};

builder.form = forwardRef(function(props, ref) {
  let formContext = [props.name];
  if (props.collection) {
    formContext.push('');
  }

  return (
    <form ref={ref} { ...props } name={null} collection={null}>
      <FormBuilderContext.Provider value={formContext}>
        { props.children }
      </FormBuilderContext.Provider>
    </form>
  );
});

builder.fields = function(props) {
  if (props.name) {
    if (props.formName) {
      var formContext = [props.formName];
    } else if (typeof useContext(FormBuilderContext) !== "undefined") {
      var formContext = [...useContext(FormBuilderContext)];
    } else {
      var formContext = [];
    }

    if (formContext.length == 0) {
      throw new Error(
        "No form context specified. Either, wrap your `builder.fields' call inside " +
        "a `builder.form' call and pass the `name' prop to the `builder.form' call, " +
        "or if you don't want to render the `form' element for some reason (maybe " +
        "the `form' was already rendered from the server), then simply pass the " +
        "`formName' prop to the `builder.fields' call by itself."
      );
    }
  } else {
    return props.children || null;
  }

  formContext.push(props.name);

  if (props.collection) {
    formContext.push('');
  }

  return (
    <FormBuilderContext.Provider
      value={formContext}>
      { props.children }
    </FormBuilderContext.Provider>
  );
}

builder.input = forwardRef(function(props, ref) {
  return (
    <input ref={ref} { ...props } collection={null}
      name={useDerivedName(props.name, props.collection)}
    />
  );
});

builder.select = forwardRef(function(props, ref) {
  return (
    <select ref={ref} { ...props } collection={null}
      name={useDerivedName(props.name, props.collection)}>
      { props.children }
    </select>
  );
});

builder.textarea = forwardRef(function(props, ref) {
  return (
    <textarea ref={ref} { ...props } collection={null}
      name={useDerivedName(props.name, props.collection)}
    />
  );
});

export default builder;
