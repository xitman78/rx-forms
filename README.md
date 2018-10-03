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
