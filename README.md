Several server side frameworks are designed to handle form data if the inputs are named in a certain way. For e.g., in Rails, if you have an input named `user[name]`, and is submitted as a part of a form, then the server would parse and convert it to a `Hash` as such: `{ "user" => { "name" => <value> } }`. This allows the server program to access the input value as: `params["user"]["name"]`, where `params` is the variable through which the parsed `Hash` is accessible.

Don't worry if you don't understand Rails; the point is that the convention of square brackets inside an input's name allows the server to store the value in a nice data structure which is then easier to work with. The only problem is that it can get cumbersome to write such form with inputs having these square brackets in their name, especially if it's a very complex form:

```jsx
<form action="/users" method="post">
  <input type="text" name="user[name][first]" />
  <input type="text" name="user[name][last]" />

  <input type="text" name="user[address][first_line][house_no]" />
  <input type="text" name="user[address][first_line][street]" />

  <input type="text" name="user[address][second_line][state]" />
  <input type="text" name="user[address][second_line][country]" />

  <input type="text" name="user[hobbies][]" />
  <input type="text" name="user[hobbies][]" />
  <input type="text" name="user[hobbies][]" />
</form>
```

Wouldn't it be nice to not care about whether or not you've properly put those square brackets and everything is working properly because of it?

Using the `react-form-builder` package, the above form can be re-written like such:

```jsx
<builder.form action="/users" method="post" resource="user">
  <builder.fields name="name">
    <builder.input type="text" name="first" />
    <builder.input type="text" name="last" />
  </builder.fields>

  <builder.fields name="address">
    <builder.fields name="first_line">
      <builder.input type="text" name="house_no" />
      <builder.input type="text" name="street" />
    </builder.fields>
  </builder.fields>

  <builder.fields name="address">
    <builder.fields name="second_line">
      <builder.input type="text" name="state" />
      <builder.input type="text" name="country" />
    </builder.fields>
  </builder.fields>

  <builder.input type="text" name="hobbies" collection />
  <builder.input type="text" name="hobbies" collection />
  <builder.input type="text" name="hobbies" collection />
</builder.form>
```

Now I know that the form goes from a nice flat structure to a nested one, but those extra lines of code will make sure that the form, when submitted, will be compatible with the server. Also, it's a lot better to read as it follows a visual grouping of what inputs belong together.

## Installation

### Via NPM

```sh
$ npm install @unobtrusive/react-form-builder
```
### Or via Yarn

```sh
$ yarn add @unobtrusive/react-form-builder
```

## Features

There are 5 components provided by this package:

- `form`
- `fields`
- `input`
- `select`
- `textarea`

All of the above are namespaced inside the `builder` object. So the usage would look like:

```jsx
import builder from "react-form-builder";

<builder.form {/* ... */}>
  <builder.input {/* ... */} />
  {/* ... */}
</builder.form>
```

All the components mentioned above are just thin wrappers on the original components. You can pass some special props to these in order for them to work. The rest of the props (including the children) are just forwarded unchanged to the original component.

Also note that even the ref passed to these components will be forwarded to the original components, which is also the reason why these are very thin wrappers.

### `form`

#### Custom props

- `resource`: Will be used to determine the first part of the input names

#### Usage

```jsx
<builder.form action="/users" method="post" resource="user">
  {/* ... */}
</builder.form>

/* == (is equivalent to) */

<form action="/users" method="post">
  {/* ... */}
</form>
```

Except for `resource`, every other prop is forwarded to the original component. The `resource` prop is internally used by the component to set up things which will then be used by the other components in the list.

### `input`

#### Custom props

- `name`: Will be used to determine what goes inside the square brackets. Should be used in conjunction with `form`
- `collection`: Will be used to determine if the input is part of a collection or not. If it is, then empty square brackets are appended at the end

#### Usage

```jsx
<builder.form action="/users" method="post" resource="user">
  <builder.input type="email" name="email" />
</builder.form>

/* == (is equivalent to) */

<form action="/users" method="post">
  <input type="email" name="user[email]" />
</form>
```

If inputs are part of a collection:

```jsx
<builder.form action="/users" method="post" resource="user">
  <builder.input type="checkbox" name="superpowers" collection />
  <builder.input type="checkbox" name="superpowers" collection />
  <builder.input type="checkbox" name="superpowers" collection />
  <builder.input type="checkbox" name="superpowers" collection />
</builder.form>

/* == (is equivalent to) */

<form action="/users" method="post">
  <input type="checkbox" name="user[superpowers][]" />
  <input type="checkbox" name="user[superpowers][]" />
  <input type="checkbox" name="user[superpowers][]" />
  <input type="checkbox" name="user[superpowers][]" />
</form>
```

### `fields`

Doesn't render any component. It is used to create a nested structure for more complex form.

#### Custom props

- `name`: Same as `input`. Except, it is used when names become complex and they have multiple parts to them
- `resource`: Same as `form`. Except, should only be used when the parent form is not rendered by the builder. For e.g., when the form is rendered from somewhere else and you only want to render a part of it using the builder
- `collection`: Same as `input`. Except, it would act on the inputs passed to it as children instead of acting on the component itself (also because the `fields` component doesn't render anything)

#### Usage

```jsx
<builder.form action="/users" method="post" resource="user">
  <builder.fields name="address">
    <builder.input type="number" name="latitude" />
    <builder.input type="number" name="longitude" />
  </builder.fields>
</builder.form>

/* == (is equivalent to) */

<form action="/users" method="post">
  <input type="number" name="user[address][latitude]" />
  <input type="number" name="user[address][longitude]" />
</form>
```

Can also be used alongside simple named inputs:

```jsx
<builder.form action="/users" method="post" resource="user">
  <builder.input type="email" name="email" />

  <builder.fields name="address">
    <builder.input type="number" name="latitude" />
    <builder.input type="number" name="longitude" />
  </builder.fields>
</builder.form>

/* == (is equivalent to) */

<form action="/users" method="post">
  <input type="email" name="user[email]" />

  <input type="number" name="user[address][latitude]" />
  <input type="number" name="user[address][longitude]" />
</form>
```

Any level of nesting is possible:

```jsx
<builder.form action="/users" method="post" resource="user">
  <builder.fields name="address">
    <builder.fields name="coordinates">
      <builder.fields name="geometric">
        <builder.input type="number" name="latitude" />
        <builder.input type="number" name="longitude" />
      </builder.fields>
    </builder.fields>
  </builder.fields>
</builder.form>

/* == (is equivalent to) */

<form action="/users" method="post" resource="user">
  <input type="number" name="user[address][coordinates][geometric][latitude]" />
  <input type="number" name="user[address][coordinates][geometric][longitude]" />
</form>
```

When the main form is not rendered using the builder:

```jsx
<form action="/users" method="post">
  {/* ... */}

  <builder.fields name="address" resource="user">
    <builder.input type="number" name="latitude" />
    <builder.input type="number" name="longitude" />
  </builder.fields>
</form>

/* == (is equivalent to) */

<form action="/users" method="post">
  {/* ... */}

  <input type="number" name="user[address][latitude]" />
  <input type="number" name="user[address][longitude]" />
</form>
```

If you don't pass the `resource` prop in the above case, then it will throw an error!

For grouped collection:

```jsx
<builder.form action="/users" method="post" resource="user">
  <builder.fields name="addresses" collection>
    <builder.input type="number" name="latitude" />
    <builder.input type="number" name="longitude" />

    <builder.input type="number" name="latitude" />
    <builder.input type="number" name="longitude" />

    <builder.input type="number" name="latitude" />
    <builder.input type="number" name="longitude" />

    {/* ... */}
  </builder.fields>
</builder.form>

/* == (is equivalent to) */

<form action="/users" method="post">
  <input type="number" name="user[addresses][][latitude]" />
  <input type="number" name="user[addresses][][longitude]" />

  <input type="number" name="user[addresses][][latitude]" />
  <input type="number" name="user[addresses][][longitude]" />

  <input type="number" name="user[addresses][][latitude]" />
  <input type="number" name="user[addresses][][longitude]" />

  {/* ... */}
</form>
```

### `textarea`

Same as `input`.

### `select`

Same as `input`. For rendering `option`, you can use the usual component.
