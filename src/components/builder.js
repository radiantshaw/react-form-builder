import React, { forwardRef, useContext } from "react";

import deriveName from "../utils/derive-name";
import BracketedName from "../utils/bracketed-name";

const FormBuilderContext = React.createContext();

function useDerivedName(name, collection) {
  if (typeof useContext(FormBuilderContext) === "undefined") {
    return name;
  }

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
  let bracketedName = new BracketedName(props.resource);
  if (props.collection) {
    bracketedName.collected();
  }

  return (
    <form ref={ref} { ...props } resource={null} collection={null}>
      <FormBuilderContext.Provider value={bracketedName}>
        { props.children }
      </FormBuilderContext.Provider>
    </form>
  );
});

builder.fields = function(props) {
  if (props.name) {
    if (props.resource) {
      var bracketedName = new BracketedName(props.resource);
    } else if (typeof useContext(FormBuilderContext) !== "undefined") {
      var bracketedName = useContext(FormBuilderContext).clone();
    } else {
      var bracketedName = null;
    }

    if (!bracketedName) {
      throw new Error(
        "No form context specified. Either, wrap your `builder.fields' call inside " +
        "a `builder.form' call and pass the `name' prop to the `builder.form' call, " +
        "or if you don't want to render the `form' element for some reason (maybe " +
        "the `form' was already rendered from the server), then simply pass the " +
        "`resource' prop to the `builder.fields' call by itself."
      );
    }
  } else {
    return props.children || null;
  }

  bracketedName.add(props.name);

  if (props.collection) {
    bracketedName.collected();
  }

  return (
    <FormBuilderContext.Provider
      value={bracketedName}>
      { props.children }
    </FormBuilderContext.Provider>
  );
}

builder.input = forwardRef(function(props, ref) {
  let bracketedName = useContext(FormBuilderContext);

  if (bracketedName) {
    bracketedName = bracketedName.clone();
    bracketedName.add(props.name);
  } else {
    bracketedName = new BracketedName(props.name);
  }

  if (props.collection) {
    bracketedName.collected();
  }

  return (
    <input ref={ref} { ...props } collection={null}
      name={bracketedName.toString()}
    />
  );
});

builder.select = forwardRef(function(props, ref) {
  let bracketedName = useContext(FormBuilderContext);

  if (bracketedName) {
    bracketedName = bracketedName.clone();
    bracketedName.add(props.name);
  } else {
    bracketedName = new BracketedName(props.name);
  }

  if (props.collection) {
    bracketedName.collected();
  }

  return (
    <select ref={ref} { ...props } collection={null}
      name={bracketedName.toString()}>
      { props.children }
    </select>
  );
});

builder.textarea = forwardRef(function(props, ref) {
  let bracketedName = useContext(FormBuilderContext);

  if (bracketedName) {
    bracketedName = bracketedName.clone();
    bracketedName.add(props.name);
  } else {
    bracketedName = new BracketedName(props.name);
  }

  if (props.collection) {
    bracketedName.collected();
  }

  return (
    <textarea ref={ref} { ...props } collection={null}
      name={bracketedName.toString()}
    />
  );
});

export default builder;
