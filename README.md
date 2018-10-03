## React forms powered by RxJs
Idea behind this module is to bring reactive forms from Angular to ReactJS
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
The existing solutions for managing forms in React known to the author, have serious performance issue especially on big forms with complex validation. It often happens that these libraries run validators for each control and render all the form each time a user makes an input, even though the input change affects only an actual HTML control and couple surronding element to reflect validation status of the control and show a validation error message. This issue leads us to poor user experience and we need to optimize the form somehow (e.g. by switching to "onBlur" validation).

RxForms library is solving the issue by rendering and validating only certain parts of a form. This idea is implemented by using RxJs observers inside instances of RxControl and RxFormControl to notify view layer (FormField and FormState) about the changes.

#### Disclaimer
Author is aware of that a passing a prototyped object with mutated properties as prop into React component might be considered as bad practice, but at the moment it looks like the most straightforward solution.
