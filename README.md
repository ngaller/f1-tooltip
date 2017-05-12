# f1-tooltip

Simple tooltip component.

 * It's very specific to my needs on a particular project.
 * Will only display on top / bottom
 * There is no automatic activation.  Include the tooltip when you want it displayed.
 * You have to pass the X and Y where you want it to appear.  In my use case, that is maintained
 by a Redux store.  The X and Y are relative to the viewport, not the container.

## Usage

```
import Tooltip from 'f1-tooltip'

const myTooltip = props =>
  <Tooltip x={props.x} y={props.y} dismiss={props.dismissTooltip} className='something'>
    Some awesome content
  </Tooltip>
```

Where:

 * `x` is the position on the page (relative to viewport), the tooltip will be centered on this, or shifted if there is not
 enough space
 * `y` is the position on the page, the tooltip will be placed below that, or above if there is not enough space
 * `dismiss` is a function that will remove the tooltip from the parent state.  If this is passed, the tooltip will
 automatically dismissed (by invoking this function) when it detects that the page is clicked (the tooltip does not
 maintain any state in itself, so it won't dismiss on its own)
 * `className` will be added to the `f1-tooltip` class

Then add some custom CSS as needed, for example:

```
.f1-tooltip {
  .f1-tooltip--arrow {
    border-top-color: blue !important;
    border-bottom-color: blue !important;
  }
  .f1-tooltip--content {
    background: white;
  }
}
```

## Todo

Maybe some default style?  Currently only the arrow has a little bit of style.  But generally this will be left to the
parent app to style.
