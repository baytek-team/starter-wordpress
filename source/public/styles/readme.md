# Styles

Document Structure inspired by inuitcss [https://github.com/inuitcss/inuitcss]

## Setup

This is where all of the intial set up for the theme is located. Things like `normalize.css` or `reset.css` if you are using them and all the variables that will be shared. There are a few initial files in here to get you started.

* `global.scss` contains variables like base font sizes and lines heights, font family stacks, default border sizes, etc.
* `colors.scss` contains variables for neutral colors, branding colors, state colors (ex. danger, success, wanring), etc.
* `layout.scss` contains variables for default margins, breakpoints, etc.

## Tools

This is where any helpers you will need like mixins will be located.

## Elements

This section contains base styling for all the HTML elements, smallest possible building blocks of your site. Styles should be logically grouped and start with the base typography for the body and build from there. Since elements well almost certainly be reused in many areas, they should inherit properties of their parent wherever it makes sense. For example `em` may only define `font-style: italic` and inherit all other properties.

Some initial files are in here to get you started.

* `page.scss` contains the base font sizes, line height, color, for the site. Also includes common elements like paragraphs, strong, em. etc.
* `headings.scss` styles for all heading levels should go here. Helper heading classes are included for styling elements like headings (ex. `.h2`) will apply the same styling as the `h2` HTML element.
* `links.scss` styles for links and their various states should go here.
* `lists.scss` styles for unordered and ordered lists and their variants go here.
* `quotes.scss` styles for blockquotes and their variants go here.
* `forms.scss` styles for all the form elements and their variants go here.
* `tables.scss` styles for all the table elements and their variants go here.
* `buttons.scss` styles for buttons (ex. `button, input[type="submit"], .btn`) and their variants (ex. `.primary, .secondary, .default`) go here.


## Components

This section is for larger building blocks of your site. These should be blocks that are generally containers for multiple elements. For example, cards, tabs, columns, sliders, menus, modals, alerts, etc.

## Site

This section is for any additional styling required for unique site elements that can't be achieved purely through the combination of components and elements variations.

## Utilities

This section is for any utility styles that might be needed in special circumstances when the design breaks the conventions defined by the elements and components. Typically these will be inserted into the content or edge case portions of templates. This is where the dreaded `!important` comes in to stomp on your styling parade.

Some intial files are in here to get you started.

* `visibility.scss` contains styles for things like screen ready only classes.
* `spacing.scss` contains styles related to content spacing to be used judiciously in your content. Things like addingg or removing padding and margins to modify the default layout of elements and components.
* `alignment.scss` contains styles related to alignment. Gutenberg includes some of these already but if you need more...
