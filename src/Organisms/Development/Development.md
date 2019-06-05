# Development component

The `<Development />` component is used to give visual indication of a number value's development (positive, negative or neutral). Underneath it uses the `<Number />` component and recieves the same props.

## Some examples

```javascript
<div><Development value={50} currency="SEK" /></div>
<div><Development value={0} percentage /></div>
<div><Development value={-2.3} percentage /></div>
```