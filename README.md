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
$ npm install --save form-builder
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
