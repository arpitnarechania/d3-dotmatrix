# d3-dotmatrix

**d3-dotmatrix** is an open-source JavaScript library for rendering Dot Matrix Charts using the D3.js library.

Check out an [Example](https://arpitnarechania.github.io/d3-dotmatrix/) where you can test various configuration options.

# Installation

Download d3-dotmatrix using bower.

```
bower install d3-dotmatrix --save
```

To use this library then, simply include d3.js, DotMatrix.js and DotMatrix.css:

``` html
<script src="/path/to/d3.min.js"></script>
<script src="/path/to/dist/DotMatrix.css"></script>
<script src="/path/to/dist/DotMatrix.js"></script>
```

# Usage

To use this library, you must create a container element and instantiate a new
DotMatrixChart:

```html
<div id="DotMatrix"></div>
```

Setting chart parameters
``` javascript

		DotMatrixChart({
		    dot_radius : 5,
		    no_of_circles_in_a_row: 40,
            dot_padding_left : 5,
            dot_padding_right : 5,
            dot_padding_top : 5,
            dot_padding_bottom : 5
		});

```

## Options

| Option                     | Description                                                               | Type     | Options
| -------------------------- | ------------------------------------------------------------------------- | -------- | ------------------------- |
| `dot_radius`               | The radius of the dots                                                    | number   | `5`                     |
| `no_of_circles_in_a_row`   | The number of circles in one row before line break happens                | number   | `40`                     |
| `dot_padding_left`         | The left margin between dots                                              | number   | `5`                      |
| `dot_padding_right`        | The right margin between dots                                             | number   | `5`                      |
| `dot_padding_top`          | The top margin between dots                                               | number   | `5`                      |
| `dot_padding_bottom`       | The bottom margin between dots                                            | number   | `5`                      |

# Author

Arpit Narechania
arpitnarechania@gmail.com

# License

MIT license.