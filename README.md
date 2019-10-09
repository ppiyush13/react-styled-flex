<div align="center">
  
  [![Codacy Badge][codacy]][codacy-url]
  [![CircleCI][build]][build-url]
  [![codecov][coverage]][coverage-url]
  [![Greenkeeper badge][greenkeeper]][greenkeeper-url]

  # react-styled-flex

  Simple, light, unopionated, CSS standard compliant Flexbox component for [react][react-git] using [styled-components][styled-components-git]
</div>  

### Features
*   **Small and dependency free**, ~4 KB minified or ~1.7 KB minified + gzipped.
*   **Clean underlying HTML DOM**. No prop leakage to DOM.
*   Supports [flex-gap][flex-gap] feature. For non supported browsers, it degrades gracefully by applying appropriate margin properties.
*   [Supports rendering](change-underlying-element) of any react component or html element.
*   [Supports unitless values](supports-unitless-values) wherever required.

### Install
```javascript
yarn add react-styled-flex
or
npm i react-styled-flex
```

**react-styled-flex** requires peer dependencies [react][react-npm] and [styled-components][styled-components-npm]. You need to add them separately. 

### API
*   **react-styled-flex** exports two components: `FlexBox` and `FlexItem`.
*   `FlexBox` behaves as a container with `display: flex` rule. 
*   `FlexItem` as acts as a child for `FlexBox`. Though `FlexBox` can have other components as child as well. 
*   Only use `FlexItem` if you need to provide additional styles to child components. See [Props](props) section for more details.
*   `FlexItem` can be treated as `FlexBox` for nested childs by setting `box` prop as `true` on `FlexItem`

### Usage
**react-styled-flex** exports two components: **FlexBox** and **FlexItem**. 
Both renders simple div with passed styles derived from passed props. 

```javascript
import {FlexBox, FlexItem} from "react-styled-flex"

const Layout = () => {
	return <FlexBox center>
    	<FlexItem>Child 1</FlexItem>
        <FlexItem flex={1}>Child 2</FlexItem>
    </FlexBox>
} 
```
On rendering `Layout` component, 
*   One parent div with style `display: flex; justify-content: center; align-items: center` and two nested divs will be rendered. 
    *   Second nested child will have style `flex: 1;` 

For rendering elements other than divs, please refer [Change underlying element
](change-underlying-element) section. 

### Props

#### FlexBox

|Props|Type|Description|
|---|:---:|---|
|height|*integer&nbsp;&vert;&nbsp;string*|Applies height|
|width|*integer&nbsp;&vert;&nbsp;string*|Applies width|
|margin|*integer&nbsp;&vert;&nbsp;string*|Applies margin using CSS [margin][margin-mdn] shorthand specification.|
|padding|*integer&nbsp;&vert;&nbsp;string*|Applies padding using CSS [padding][padding-mdn] shorthand specification.|
|border|*integer&nbsp;&vert;&nbsp;string*|Applies border using CSS [border][border-mdn] shorthand specification.|
|inline|*boolean*|If true, applies `display: inline-flex` rule otherwise applies `display: flex`. Default: *false*|
|column|*boolean*|If true, `flex-direction` rule is set as `column` otherwise set as `row`|
|reverse|*boolean*|It works in tandem with `column` prop to generate `flex-direction: {row\|column}-reverse`. Following table summaries it,<br/>  <table><thead><tr><th>column</th><th>reverse</th><th>flex&minus;direction</th></tr></thead><tbody><tr><td>false</td><td>false</td><td>row</td></tr><tr><td>false</td><td>true</td><td>row-reverse</td></tr><tr><td>true</td><td>false</td><td>column</td></tr><tr><td>true</td><td>true</td><td>column-reverse</td></tr></tbody></table>|
|wrap|*boolean*|If true, applies `flex-wrap` as `wrap`|
|wrapReverse|*boolean*|If true, applies `flex-wrap` as `wrap-reverse`|
|center|*boolean*|If true, then applies `justify-content: center` and `align-items: center`|
|gap|*integer&nbsp;&vert;&nbsp;string*| Applies gap using CSS [gap][gap-mdn] shorthand specification if browser supports it.|
|columnGap|*integer&nbsp;&vert;&nbsp;string*| Applies CSS [column-gap][column-gap-mdn] property if browser supports it.|
|rowGap|*integer&nbsp;&vert;&nbsp;string*| Applies CSS [row-gap][row-gap-mdn] property if browser supports it.|
|justifyContent|*string*|Applies `justify-content` rule. Depending on the browser, [these justify-content][justify-content-mdn] values might be supported.|
|alignItems|*string*|Applies `align-items` rule. Depending on the browser, [these align-items][align-items-mdn] values might be supported.|
|alignContent|*string*|Applies `align-content` rule. Depending on the browser, [these align-content][align-content-mdn] values might be supported.|

#### FlexItem
|Props|Type|Description|
|---|:---:|---|
|flex|*integer&nbsp;&vert;&nbsp;string*|Applies flex using CSS [flex][flex-prop-mdn] shorthand specification.|
|grow|*integer&nbsp;&vert;&nbsp;string*|Applies CSS [flex-grow][flex-grow-mdn] property|
|shrink|*integer&nbsp;&vert;&nbsp;string*|Applies CSS [flex-shrink][flex-shrink-mdn] property|
|basis|*integer&nbsp;&vert;&nbsp;string*|Applies CSS [flex-basis][flex-basis-mdn] property|
|order|*integer&nbsp;&vert;&nbsp;string*|Applies CSS [order][order-mdn] property|
|alignSelf|*string*|Applies `align-self` rule. Depending on the browser, [these align-self][align-self-mdn] values might be supported.|
|box|*boolean*|If true, then FlexItem also behaves as a FlexBox. So in addition to FlexItem props, all the FlexBox props can also be applied.<br/>Default: *false*|

### Supports unitless values
*   **react-styled-flex** supports unitless values where units are required. In that case value will be auto suffixed with with `px` unit.<br/>
*   Only values where unites are required(eg. **height, width, margin**) will be suffixed. 
*   CSS rules which don't have units won't be suffixed (eg. **order**)

### Supports flex gap feature
*   Browser supports flex gap feature
    *   If [flex gap feature][flex-gap] is supported in browser than gap, columnGap and rowGap props will function as per specification.

*   Browser don't support flex gap feature
    *   If browser does not supports it, then we intend to provide graceful degradation of flex gap feature by setting margin. This fallback is provided only if, either of **gap props** is set and **wrap** prop is not set.
	*   If **wrap** is set then gap wont work in non-supported browser.
	*   Rest all props are supported. 

### Change underlying element
*   By default `FlexBox` and `FlexItem` renders div in the DOM.

*   We can change it to any HTML element or react component using `is` prop.

*   Example:
    ```javascript
    import {FlexBox, FlexItem} from "react-styled-flex";

    <FlexBox center>
        <FlexItem is={"button"}>Child 1</FlexItem>
        <FlexItem is={"button"}>Child 2</FlexItem>
    </FlexBox>
    ```
    Render `Child 1` and `Child 2` as button

*   Similarly any react component can be rendered

*   Please don't use `as` prop, provided by **styled-components**, to change underlying DOM element. Element would be changed but it will leak props to the DOM.

### Resources
*   [A Complete Guide to Flexbox][flex-guide-css-tricks]
*   [CSS Flexible Box Layout][flex-guide-mdn]

[codacy]: https://api.codacy.com/project/badge/Grade/3883d0db80a44fa6b18a311be25a8553
[codacy-url]: https://www.codacy.com/manual/ppiyush13/react-styled-flex?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ppiyush13/react-styled-flex&amp;utm_campaign=Badge_Grade
[build]: https://circleci.com/gh/ppiyush13/react-styled-flex/tree/master.svg?style=shield
[build-url]: https://circleci.com/gh/ppiyush13/react-styled-flex/tree/master
[coverage]: https://codecov.io/gh/ppiyush13/react-styled-flex/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/ppiyush13/react-styled-flex
[greenkeeper]: https://badges.greenkeeper.io/ppiyush13/react-styled-flex.svg
[greenkeeper-url]: https://greenkeeper.io/
[styled-components-git]: https://github.com/styled-components/styled-components
[react-git]: https://github.com/facebook/react
[flex-gap]: https://developer.mozilla.org/en-US/docs/Web/CSS/gap#Flex_layout
[styled-components-npm]: https://www.npmjs.com/package/styled-components
[react-npm]: https://www.npmjs.com/package/react
[padding-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/padding#Syntax
[margin-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/margin#Syntax
[border-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/border#Syntax
[justify-content-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#Values
[align-items-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items#Values
[align-content-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content#Values
[gap-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/gap#Syntax
[row-gap-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
[column-gap-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
[order-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/order
[flex-prop-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex
[flex-grow-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
[flex-shrink-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
[flex-basis-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
[align-self-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self#Values
[flex-guide-css-tricks]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[flex-guide-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout
