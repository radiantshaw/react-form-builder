import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

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

  it("renders the children between the form tag", function() {
    act(function() {
      render(
        <builder.form>
          <div>Test immediate children</div>
          <div>
            <span>Test inner children</span>
          </div>
        </builder.form>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
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

  it("renders the children between the form tag", function() {
    act(function() {
      render(
        <builder.select>
          <option value="test-value-one">Test option one</option>
          <option value="test-value-two">Test option two</option>
          <option value="test-value-any">Test option any</option>
        </builder.select>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
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

describe("builder.fields()", function() {
  it("renders nothing", function() {
    act(function() {
      render(<builder.fields></builder.fields>, container);
    });

    expect(container.children.length).toEqual(0);
  });

  it("renders the children directly", function() {
    act(function() {
      render(
        <builder.fields>
          <div>Test immediate children</div>
          <div>
            <span>Test inner children</span>
          </div>
        </builder.fields>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});

describe("form builder", function() {
  it("sets derived name for input element", function() {
    act(function() {
      render(
        <builder.form name="test">
          <builder.input name="input" />
          <builder.textarea name="textarea" />
          <builder.select name="select">
            <option value="test-value-one">Test option one</option>
            <option value="test-value-two">Test option two</option>
            <option value="test-value-any">Test option any</option>
          </builder.select>
        </builder.form>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("sets derived name for input element one level deep", function() {
    act(function() {
      render(
        <builder.form name="test">
          <div>
            <builder.input name="input" />
            <builder.textarea name="textarea" />
            <builder.select name="select">
              <option value="test-value-one">Test option one</option>
              <option value="test-value-two">Test option two</option>
              <option value="test-value-any">Test option any</option>
            </builder.select>
          </div>
        </builder.form>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("sets derived name for input element several levels deep", function() {
    act(function() {
      render(
        <builder.form name="test">
          <div>
            <div>
              <div>
                <builder.input name="input" />
                <builder.textarea name="textarea" />
                <builder.select name="select">
                  <option value="test-value-one">Test option one</option>
                  <option value="test-value-two">Test option two</option>
                  <option value="test-value-any">Test option any</option>
                </builder.select>
              </div>
            </div>
          </div>
        </builder.form>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("sets derived name for input elements using fields builder", function() {
    act(function() {
      render(
        <builder.form name="test">
          <builder.fields name="fields">
            <builder.input name="input" />
            <builder.textarea name="textarea" />
            <builder.select name="select">
              <option value="test-value-one">Test option one</option>
              <option value="test-value-two">Test option two</option>
              <option value="test-value-any">Test option any</option>
            </builder.select>
          </builder.fields>
        </builder.form>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("sets derived name for input elements using proper context", function() {
    act(function() {
      render(
        <builder.form name="test">
          <builder.input name="pre-outer-input" />
          <builder.textarea name="pre-outer-textarea" />
          <builder.select name="pre-outer-select">
            <option value="test-value-one">Test option one</option>
            <option value="test-value-two">Test option two</option>
            <option value="test-value-any">Test option any</option>
          </builder.select>
          <builder.fields name="fields">
            <builder.input name="inner-input" />
            <builder.textarea name="inner-textarea" />
            <builder.select name="inner-select">
              <option value="test-value-one">Test option one</option>
              <option value="test-value-two">Test option two</option>
              <option value="test-value-any">Test option any</option>
            </builder.select>
          </builder.fields>
          <builder.input name="post-outer-input" />
          <builder.textarea name="post-outer-textarea" />
          <builder.select name="post-outer-select">
            <option value="test-value-one">Test option one</option>
            <option value="test-value-two">Test option two</option>
            <option value="test-value-any">Test option any</option>
          </builder.select>
        </builder.form>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("sets derived name for input elements with nested fields", function() {
    act(function() {
      render(
        <builder.form name="test">
          <builder.fields name="outer-fields">
            <builder.fields name="inner-fields">
              <builder.input name="input" />
              <builder.textarea name="textarea" />
              <builder.select name="select">
                <option value="test-value-one">Test option one</option>
                <option value="test-value-two">Test option two</option>
                <option value="test-value-any">Test option any</option>
              </builder.select>
            </builder.fields>
          </builder.fields>
        </builder.form>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
