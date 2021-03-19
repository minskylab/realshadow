# Real Shadow

Realshadow adds a real time based shadow for any HTML Element. It works with the current time calculating each `100mS`.

## Demo

See this codepen: [https://codepen.io/bregydoc/pen/RwoXPVJ](https://codepen.io/bregydoc/pen/RwoXPVJ).

## How to use

Only need to add this line at the end of your `body` tag:

```html
<script type="text/javascript" src="https://unpkg.com/@minskylab/realshadow@0.2.1/umd/index.js"></script>
```

Now, you can apply the real shadow only adding the `data-rs-kind` data tag with options `box|text|both`:

### Basic Example

```html
<div data-rs-kind="box" />
<span data-rs-kind="text"> HELLO WORLD </span>
```

### Options

You can configure the behavior of your realshadow using the below data tags.

```html
data-rs-kind="box" # Shadow kind data-rs-from-hour="06" # Sunset hour data-rs-to-hour="18" # Sunrise hour
data-rs-distance="10" # Shadow distance data-rs-color="#0d1117" # Shadow color data-rs-blur-radius="2" # Shadow blur
radius (in pixels) data-rs-hour="10:00" # Forced static hour
```

#### Shadow kind

The shadow kind: `box|text|both`.

box-shadow: [Official Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow).
text-shadow: [Official Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow).

---

## Contribute

I need to complete this documentation, if you want to help only make an issue or pull request. Thanks.
