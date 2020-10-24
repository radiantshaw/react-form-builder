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
  it("renders a form element", function() {
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

  it("forwards the HTML attributes", function() {
    const innerAttributes = {
      accessKey: 't',
      autoCapitalize: "characters",
      "data-test": "Test data",
      "data-another-test": "Another test data",
      dir: "rtl",
      draggable: "false",
      id: "test-id",
      lang: "en-GB",
      spellCheck: "false",
      tabIndex: '0',
      title: "Test title",
      action: "/test-action",
      encType: "multipart/form-data",
      method: "post",
      target: "_blank"
    };

    const correspondingDOMPropertyAttributes = {
      className: "test-class another-test-class",
      hidden: true,
      acceptCharset: "utf-8",
      noValidate: false,
    };

    const processedAttributes = {
      style: { display: "inline" }
    };

    act(function() {
      render(
        <builder.form
          { ...innerAttributes }
          { ...correspondingDOMPropertyAttributes }
          style={processedAttributes.style}>
        </builder.form>, container
      );
    });

    Object.keys(innerAttributes).forEach(function(key) {
      expect(container.children[0].getAttribute(key))
        .toEqual(innerAttributes[key]);
    });

    Object.keys(correspondingDOMPropertyAttributes).forEach(function(key) {
      expect(container.children[0][key])
        .toEqual(correspondingDOMPropertyAttributes[key]);
    });

    expect(container.children[0].getAttribute("style")).toEqual("display: inline;");
  });

  it("renders the children between the opening and closing form tags", function() {
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
  it("renders an input element", function() {
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

  it("forwards the HTML attributes", function() {
    const innerAttributes = {
      accessKey: 't',
      autoCapitalize: "characters",
      "data-test": "Test data",
      "data-another-test": "Another test data",
      dir: "rtl",
      draggable: "false",
      id: "test-id",
      lang: "en-GB",
      spellCheck: "false",
      tabIndex: '0',
      title: "Test title",
      autoComplete: "on",
      form: "test-form",
      list: "test-list",
      type: "hidden",
      value: "Test value"
    };

    const correspondingDOMPropertyAttributes = {
      className: "test-class another-test-class",
      disabled: true,
      hidden: true,
      required: true
    };

    const processedAttributes = {
      style: { display: "inline" }
    };

    act(function() {
      render(
        <builder.input
          { ...innerAttributes }
          { ...correspondingDOMPropertyAttributes }
          style={processedAttributes.style}
        />, container
      );
    });

    Object.keys(innerAttributes).forEach(function(key) {
      expect(container.children[0].getAttribute(key))
        .toEqual(innerAttributes[key]);
    });

    Object.keys(correspondingDOMPropertyAttributes).forEach(function(key) {
      expect(container.children[0][key])
        .toEqual(correspondingDOMPropertyAttributes[key]);
    });

    expect(container.children[0].getAttribute("style")).toEqual("display: inline;");
  });
});

describe("builder.select()", function() {
  it("renders a select element", function() {
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

  it("forwards the HTML attributes", function() {
    const innerAttributes = {
      accessKey: 't',
      autoCapitalize: "characters",
      "data-test": "Test data",
      "data-another-test": "Another test data",
      dir: "rtl",
      draggable: "false",
      id: "test-id",
      lang: "en-GB",
      spellCheck: "false",
      tabIndex: '0',
      title: "Test title",
      autoComplete: "on",
      form: "test-form",
      size: '2'
    };

    const correspondingDOMPropertyAttributes = {
      className: "test-class another-test-class",
      disabled: true,
      multiple: true,
      hidden: true,
      required: true
    };

    const processedAttributes = {
      style: { display: "inline" }
    };

    act(function() {
      render(
        <builder.select
          { ...innerAttributes }
          { ...correspondingDOMPropertyAttributes }
          style={processedAttributes.style}>
        </builder.select>, container
      );
    });

    Object.keys(innerAttributes).forEach(function(key) {
      expect(container.children[0].getAttribute(key))
        .toEqual(innerAttributes[key]);
    });

    Object.keys(correspondingDOMPropertyAttributes).forEach(function(key) {
      expect(container.children[0][key])
        .toEqual(correspondingDOMPropertyAttributes[key]);
    });

    expect(container.children[0].getAttribute("style")).toEqual("display: inline;");
  });

  it("renders the children between the opening and closing select tags", function() {
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
  it("renders a textarea element", function() {
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

  it("forwards the HTML attributes", function() {
    const innerAttributes = {
      accessKey: 't',
      autoCapitalize: "characters",
      "data-test": "Test data",
      "data-another-test": "Another test data",
      dir: "rtl",
      draggable: "false",
      id: "test-id",
      lang: "en-GB",
      spellCheck: "false",
      tabIndex: '0',
      title: "Test title",
      autoComplete: "on",
      cols: "20",
      form: "test-form",
      maxLength: "42",
      minLength: '5',
      placeholder: "Text placeholder",
      rows: '7',
      wrap: "soft"
    };

    const correspondingDOMPropertyAttributes = {
      className: "test-class another-test-class",
      disabled: true,
      multiple: true,
      hidden: true,
      readOnly: true,
      required: true
    };

    const processedAttributes = {
      style: { display: "inline" }
    };

    act(function() {
      render(
        <builder.textarea
          { ...innerAttributes }
          { ...correspondingDOMPropertyAttributes }
          style={processedAttributes.style}
        />, container
      );
    });

    Object.keys(innerAttributes).forEach(function(key) {
      expect(container.children[0].getAttribute(key))
        .toEqual(innerAttributes[key]);
    });

    Object.keys(correspondingDOMPropertyAttributes).forEach(function(key) {
      expect(container.children[0][key])
        .toEqual(correspondingDOMPropertyAttributes[key]);
    });

    expect(container.children[0].getAttribute("style")).toEqual("display: inline;");
  });
});

describe("builder.fields()", function() {
  it("renders no element", function() {
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
  it("sets the derived name for form inputs", function() {
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

  it("sets the derived name for form inputs nested one level deep", function() {
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

  it("sets the derived name for form inputs nested several levels deep", function() {
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

  it("sets the derived name for form inputs using fields builder", function() {
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

  it("sets the derived name for form inputs using proper nested context", function() {
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

  it("sets the derived name for form inputs with nested fields", function() {
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

  it("can set the derived name for form inputs without a root form", function() {
    act(function() {
      render(
        <builder.fields name="fields" formName="test">
          <builder.input name="input" />
          <builder.textarea name="textarea" />
          <builder.select name="select">
            <option value="test-value-one">Test option one</option>
            <option value="test-value-two">Test option two</option>
            <option value="test-value-any">Test option any</option>
          </builder.select>
        </builder.fields>, container
      );
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
