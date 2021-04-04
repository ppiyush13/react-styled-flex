# react-styled-flex

[![module verion and npm link][npm]][npm-url]
[![bundlephobia minified size][size-min]][bundlephobia-url]
[![bundlephobia minizipped size][size-minzip]][bundlephobia-url]
[![types available][package-types]][npm-url]
[![Codacy Badge][codacy]][codacy-url]
[![CircleCI][build]][build-url]
[![codecov][coverage]][coverage-url]

Simple, light, unopinionated, CSS standard compliant Flexbox component for [react][react-git] using [styled-components][styled-components-git]

## Changelog
This is `react-styled-flex@2` documentation. For version 1, please follow [this][version-1-docs] link. Following changes are introduced in version 2: 

**✂️ Breaking changes**
* `is` prop of FlexBox and FlexItem component is longer supported. Instead use native styled-components ["as" polymorphic prop][styled-components-as-prop] to render another react component or html element.
* Supports `styled-components` version greater than or equal to `>=5.1.0`. If you want to use older versions of `styled-components`, please install `react-styled-flex` version 1 by using `npm install react-styled-flex@latest-1` command.

**🚀 Enhancements**
* Typescript rewrite.
* Supports SSR and SSG rendering.
* Introduce [Box](#Box) component. 
* Uses `styled-components` [shouldForwardProp][styled-components-should-forward-prop] mechanism to avoid leaking props to DOM. As a result, `is` prop from version 1 is no longer supported. 
## Features
*   **Lightweight and dependency free**, ~3 KB minified or ~1.4 KB minified + gzipped.
*   **Clean underlying HTML DOM**. No prop leakage to DOM.
*   Supports [flex-gap][flex-gap] feature. For non supported browsers, it degrades gracefully by applying appropriate margin properties.
*   [Supports rendering](#change-underlying-element) of any react component or html element.
*   [Supports unitless values](#supports-unitless-values) wherever required.
*   Supports SSR and SSG rendering.
*   TypeScript support.

## Installation
Yarn
```sh
yarn add react-styled-flex
```
Npm
```sh
npm i react-styled-flex
```

**react-styled-flex** requires peer dependencies [react][react-npm] and [styled-components][styled-components-npm]. You need to add them separately. 

## API
*   **react-styled-flex** exports three components: `Box`, `FlexBox` and `FlexItem`.
*   `Box` behaves as basic CSS box. `FlexBox` and `FlexItem` extends `Box`.
*   `FlexBox` behaves as a container with `display: flex` rule. 
*   `FlexItem` as acts as a child for `FlexBox`. Though `FlexBox` can have other components as child as well. 
*   Only use `FlexItem` if you need to provide additional styles to child components. See [Props](#props) section for more details.
*   `FlexItem` can be treated as `FlexBox` for nested childs by setting `box` prop as `true` on `FlexItem`

## Usage
**react-styled-flex** exports three components: **Box**, **FlexBox** and **FlexItem**. 
All renders simple div with styles derived from passed props. 

```javascript
import { Box, FlexBox, FlexItem } from "react-styled-flex";

const Layout = () => {
    return <FlexBox center>
        <Box padding={10}>Child 1</Box>
        <FlexItem>Child 2</FlexItem>
        <FlexItem flex={1}>Child 3</FlexItem>
    </FlexBox>
}
```
On rendering `Layout` component, 
*   One parent div with style `display: flex; justify-content: center; align-items: center` and three nested divs will be rendered.
    *   First child will have padding of `10px`.
    *   Second child will be simple div.
    *   Third child will have style `flex: 1;` 

For rendering elements other than divs, please refer [Change underlying element
](#change-underlying-element) section. 

## Props

### Box

All props are **optional**.

|Props|Type|Description|
|---|:---:|---|
|height|*string&nbsp;&vert;&nbsp;number*|Applies height|
|width|*string&nbsp;&vert;&nbsp;number*|Applies width|
|margin|*string&nbsp;&vert;&nbsp;number*|Applies margin using CSS [margin][margin-mdn] shorthand specification|
|padding|*string&nbsp;&vert;&nbsp;number*|Applies padding using CSS [padding][padding-mdn] shorthand specification|
|border|*string&nbsp;&vert;&nbsp;number*|Applies border using CSS [border][border-mdn] shorthand specification|
### FlexBox

All props are **optional** and all boolean props defaults to **false**.

|Props|Type|Description|
|---|:---:|---|
|height|*string&nbsp;&vert;&nbsp;number*|Applies height|
|width|*string&nbsp;&vert;&nbsp;number*|Applies width|
|margin|*string&nbsp;&vert;&nbsp;number*|Applies margin using CSS [margin][margin-mdn] shorthand specification|
|padding|*string&nbsp;&vert;&nbsp;number*|Applies padding using CSS [padding][padding-mdn] shorthand specification|
|border|*string&nbsp;&vert;&nbsp;number*|Applies border using CSS [border][border-mdn] shorthand specification|
|inline|*boolean*|If true, applies `display: inline-flex` rule otherwise applies `display: flex`|
|column|*boolean*|If true, `flex-direction` rule is set as `column` otherwise set as `row`|
|reverse|*boolean*|It works in tandem with `column` prop to generate `flex-direction: {row\|column}-reverse`. Following table summaries it,<br/>  <table><thead><tr><th>column</th><th>reverse</th><th>flex&minus;direction</th></tr></thead><tbody><tr><td>false</td><td>false</td><td>row</td></tr><tr><td>false</td><td>true</td><td>row-reverse</td></tr><tr><td>true</td><td>false</td><td>column</td></tr><tr><td>true</td><td>true</td><td>column-reverse</td></tr></tbody></table>|
|wrap|*boolean*|If true, applies `flex-wrap` as `wrap`|
|wrapReverse|*boolean*|If true, applies `flex-wrap` as `wrap-reverse`|
|center|*boolean*|If true, then applies `justify-content: center` and `align-items: center`|
|gap|*string&nbsp;&vert;&nbsp;number*| Applies gap using CSS [gap][gap-mdn] shorthand specification if browser supports it, otherwise fallbacks to using margin property. Read [flex gap feature](#supports-flex-gap-feature) to understand more|
|columnGap|*string&nbsp;&vert;&nbsp;number*| Applies CSS [column-gap][column-gap-mdn] property if browser supports it, otherwise fallbacks to using margin property. Read [flex gap feature](#supports-flex-gap-feature) to understand more|
|rowGap|*string&nbsp;&vert;&nbsp;number*| Applies CSS [row-gap][row-gap-mdn] property if browser supports it, otherwise fallbacks to using margin property. Read [flex gap feature](#supports-flex-gap-feature) to understand more|
|justifyItems|*string*|Applies `justify-items` rule. Depending on the browser, [these justify-items][justify-items-mdn] values might be supported|
|justifyContent|*string*|Applies `justify-content` rule. Depending on the browser, [these justify-content][justify-content-mdn] values might be supported|
|alignItems|*string*|Applies `align-items` rule. Depending on the browser, [these align-items][align-items-mdn] values might be supported|
|alignContent|*string*|Applies `align-content` rule. Depending on the browser, [these align-content][align-content-mdn] values might be supported|

### FlexItem

All props are **optional** and all boolean props defaults to **false**.

|Props|Type|Description|
|---|:---:|---|
|height|*string&nbsp;&vert;&nbsp;number*|Applies height|
|width|*string&nbsp;&vert;&nbsp;number*|Applies width|
|margin|*string&nbsp;&vert;&nbsp;number*|Applies margin using CSS [margin][margin-mdn] shorthand specification|
|padding|*string&nbsp;&vert;&nbsp;number*|Applies padding using CSS [padding][padding-mdn] shorthand specification|
|border|*string&nbsp;&vert;&nbsp;number*|Applies border using CSS [border][border-mdn] shorthand specification|
|flex|*string&nbsp;&vert;&nbsp;number*|Applies flex using CSS [flex][flex-prop-mdn] shorthand specification|
|grow|*string&nbsp;&vert;&nbsp;number*|Applies CSS [flex-grow][flex-grow-mdn] property|
|shrink|*string&nbsp;&vert;&nbsp;number*|Applies CSS [flex-shrink][flex-shrink-mdn] property|
|basis|*string&nbsp;&vert;&nbsp;number*|Applies CSS [flex-basis][flex-basis-mdn] property|
|order|*string&nbsp;&vert;&nbsp;number*|Applies CSS [order][order-mdn] property|
|justifySelf|*string*|Applies `justify-self` rule. Depending on the browser, [these justify-self][justify-self-mdn] values might be supported.|
|alignSelf|*string*|Applies `align-self` rule. Depending on the browser, [these align-self][align-self-mdn] values might be supported|
|box|*boolean*|If true, then FlexItem also behaves as a FlexBox. So in addition to FlexItem props, all the FlexBox props can also be applied|

## Supports unitless values
*   **react-styled-flex** supports unitless values where units are required. In that case value will be auto suffixed with with `px` unit.<br/>
*   Only values where unites are required(eg. **height, width, margin**) will be suffixed. 
*   CSS rules which don't have units won't be suffixed (eg. **order**)

## Supports flex gap feature
*   Browser supports flex gap feature
    *   If [flex gap feature][flex-gap] is supported in browser than gap, columnGap and rowGap props will function as per specification.

*   Browser don't support flex gap feature
    *   If browser does not supports it, then we intend to provide graceful degradation of flex gap feature by setting margin. This fallback is provided only if, either of **gap props** is set and **wrap** prop is not set.
	*   If **wrap** is set then gap wont work in non-supported browser.
	*   Rest all props are supported. 

## Change underlying element
*   By default `FlexBox` and `FlexItem` renders div in the DOM.

*   We can change it to any HTML element or react component using `styled-components` [as][styled-components-as-prop] prop.

*   Example:
    ```javascript
    import { FlexBox, FlexItem } from "react-styled-flex";

    /* other logic */

    <FlexBox center>
        <FlexItem as={"button"}>Child 1</FlexItem>
        <FlexItem as={"button"}>Child 2</FlexItem>
    </FlexBox>
    ```
    Render `Child 1` and `Child 2` as button

*   Similarly any react component can be rendered

## License
MIT © Piyush Lodaya

## Resources
*   [A Complete Guide to Flexbox][flex-guide-css-tricks]
*   [CSS Flexible Box Layout][flex-guide-mdn]

[npm]: https://img.shields.io/npm/v/react-styled-flex
[npm-url]: https://www.npmjs.com/package/react-styled-flex
[size-min]: https://img.shields.io/bundlephobia/min/react-styled-flex
[size-minzip]: https://img.shields.io/bundlephobia/minzip/react-styled-flex
[bundlephobia-url]: https://bundlephobia.com/result?p=react-styled-flex
[package-types]: https://img.shields.io/npm/types/react-styled-flex
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
[justify-items-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items#values
[justify-content-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#Values
[align-items-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items#Values
[align-content-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content#Values
[gap-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/gap#Syntax
[row-gap-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap#Syntax
[column-gap-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap#Syntax
[order-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/order#Syntax
[flex-prop-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex#Syntax
[flex-grow-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow#Syntax
[flex-shrink-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink#Syntax
[flex-basis-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis#Syntax
[justify-self-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self#values
[align-self-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self#Values
[flex-guide-css-tricks]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[flex-guide-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout
[version-1-docs]: https://github.com/ppiyush13/react-styled-flex/blob/v1/README.md
[styled-components-should-forward-prop]: https://styled-components.com/docs/api#shouldforwardprop
[styled-components-as-prop]: https://styled-components.com/docs/api#as-polymorphic-prop