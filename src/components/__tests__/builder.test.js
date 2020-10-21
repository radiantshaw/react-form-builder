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
});

describe("builder.input()", function() {
  it("renders an input tag", function() {
    act(function() {
      render(<builder.input />, container);
    });

    expect(container.children[0].tagName).toEqual("INPUT");
  });
});

describe("builder.select()", function() {
  it("renders a select tag", function() {
    act(function() {
      render(<builder.select></builder.select>, container);
    });

    expect(container.children[0].tagName).toEqual("SELECT");
  });
});

describe("builder.textarea()", function() {
  it("renders a textarea tag", function() {
    act(function() {
      render(<builder.textarea />, container);
    });

    expect(container.children[0].tagName).toEqual("TEXTAREA");
  });
});
