## React forms powered by RxJs
Library for managing forms in ReactJS powered by RxJs, in some way inspired by Reactive Forms of Angular.
### Installation
```sh
npm install rx-forms
```
### Concept
The main concept of the module is to separate model and view layers.
The model for a form can be created by means of RxControl and RxFormGroup classes:
```js
this.form = new RxFormGroup({
  firstName: new RxControl('John'),
  lastName: new RxControl('Smith'),
});
```
The view layer is represented by two React components - FormField and FormState, that are connected with the model via props and using "render props" pattern to pass state and handlers to actual form control:
```jsx
<FormField control={this.form.controls.firstName}>
  {
    (state, {handleInputChange}) => <input 
        type="text" 
        value={state.value} 
        onChange={handleInputChange} />
  }
</FormField>

<FormState form={this.form}>
  {
    (state) => <button disabled={!(state.touched && state.valid)}>Submit</button>
  }
</FormState>
```
### Why
The existing solutions for managing forms in React known to the author, have serious performance issue especially on big forms with complex validation. It often happens that these libraries run validators for each control and render all the form each time a user makes an input, even though the input change affects only an actual HTML control and a few surrounding elements to reflect validation status of the control and show a validation error message. This issue leads us to poorer user experience and force us to optimize the form by some tricks (e.g. by switching to "onBlur" validation).

RxForms library is solving the issue by rendering and validating only certain parts of a form. This idea is implemented by using RxJs observers inside instances of RxControl and RxFormControl to notify view layer (FormField and FormState) about the changes.

#### Disclamer
Author is aware of that a passing a prototyped object with mutated properties as prop into React component might be considered as a bad practice, but at the moment it looks like the most straightforward solution.

RxForms library is currently on early development stage and it's not recommended to use it in a production project. Minor version changes may contain breaking API changes.

Contributors are welcomed!
