import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import builder from "../builder";

let container = null;

beforeEach(function() {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(function() {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("builder.form()", function() {
  it("renders a form tag", function() {
    act(function() {
      render(<builder.form></builder.form>, container);
    });

    expect(container.children[0].tagName).toEqual("FORM");
  });

  it("forwards the ref", function() {
    const testRef = React.createRef(null);

    act(function() {
      render(<builder.form ref={testRef}></builder.form>, container);
    });

    expect(container.children[0]).toEqual(testRef.current);
  });
});

describe("builder.input()", function() {
  it("renders an input tag", function() {
    act(function() {
      render(<builder.input />, container);
    });

    expect(container.children[0].tagName).toEqual("INPUT");
  });

  it("forwards the ref", function() {
    const testRef = React.createRef(null);

    act(function() {
      render(<builder.input ref={testRef} />, container);
    });

    expect(container.children[0]).toEqual(testRef.current);
  });
});

describe("builder.select()", function() {
  it("renders a select tag", function() {
    act(function() {
      render(<builder.select></builder.select>, container);
    });

    expect(container.children[0].tagName).toEqual("SELECT");
  });

  it("forwards the ref", function() {
    const testRef = React.createRef(null);

    act(function() {
      render(<builder.select ref={testRef}></builder.select>, container);
    });

    expect(container.children[0]).toEqual(testRef.current);
  });
});

describe("builder.textarea()", function() {
  it("renders a textarea tag", function() {
    act(function() {
      render(<builder.textarea />, container);
    });

    expect(container.children[0].tagName).toEqual("TEXTAREA");
  });

  it("forwards the ref", function() {
    const testRef = React.createRef(null);

    act(function() {
      render(<builder.textarea ref={testRef} />, container);
    });

    expect(container.children[0]).toEqual(testRef.current);
  });
});
