# Shopify Liquid and Schema: Step-by-Step Tutorial

## 1. What is Liquid?

Liquid is Shopify's template language. It combines HTML with dynamic store
data. Shopify processes Liquid on the server and sends normal HTML to the
customer's browser.

Liquid has three important forms:

### Output

Output uses double curly braces:

```liquid
{{ product.title }}
{{ product.price | money }}
```

The first line prints the product title. The second prints the price and uses
the `money` filter to format it in the store's currency.

### Tags

Tags use curly braces and percent signs. They control logic but do not directly
print a value:

```liquid
{% if product.available %}
  <p>In stock</p>
{% else %}
  <p>Sold out</p>
{% endif %}
```

### Comments

Liquid comments are not displayed in the page:

```liquid
{% comment %}
  This is a developer note.
{% endcomment %}
```

## 2. Variables

Create a variable with `assign`:

```liquid
{% assign greeting = 'Welcome to our store' %}
<h2>{{ greeting }}</h2>
```

Shopify also provides objects containing store data:

```liquid
{{ shop.name }}
{{ product.title }}
{{ collection.title }}
{{ customer.first_name }}
```

Some objects only exist on certain pages. For example, `product` is normally
available on a product page.

## 3. Filters

Filters change an output value. The value goes before the pipe (`|`):

```liquid
{{ product.title | upcase }}
{{ product.description | strip_html | truncate: 100 }}
{{ product.price | money }}
{{ 'product-1' | asset_url }}
```

Filters can be chained. Shopify applies them from left to right.

### Filters you will use most often

#### `handleize`

Converts text into a lowercase, hyphen-separated handle. This is useful for
HTML IDs, CSS classes, and URL-friendly names.

```liquid
{{ 'Summer Collection 2026' | handleize }}
```

Output:

```text
summer-collection-2026
```

#### `downcase`, `upcase`, and `capitalize`

Change the letter case of a string:

```liquid
{{ 'New ARRIVAL' | downcase }}
{{ 'New arrival' | upcase }}
{{ 'new arrival' | capitalize }}
```

Output:

```text
new arrival
NEW ARRIVAL
New arrival
```

These filters are useful when comparing normalized text or keeping headings
consistent.

#### `split` and `join`

`split` divides a string and returns an array. `join` combines the items in an
array into one string.

```liquid
{% assign tags = 'new,sale,summer' | split: ',' %}

{% for tag in tags %}
  <span>{{ tag }}</span>
{% endfor %}

{{ tags | join: ' / ' }}
```

The final line outputs:

```text
new / sale / summer
```

You can also use `join` directly with Shopify arrays:

```liquid
{{ product.tags | join: ', ' }}
```

#### `replace`

Replaces every occurrence of one piece of text with another:

```liquid
{{ 'red-shirt-red' | replace: 'red', 'blue' }}
```

Output:

```text
blue-shirt-blue
```

#### `append` and `prepend`

Add text to the end or beginning of a value:

```liquid
{{ product.title | append: ' – New' }}
{{ section.id | prepend: 'section-' }}
```

If the title is `Cotton Shirt` and the section ID is `123`, the output is:

```text
Cotton Shirt – New
section-123
```

#### `truncate`

Shortens a string to a maximum number of characters. The character count
includes the ending text.

```liquid
{{ product.description | strip_html | truncate: 40 }}
{{ product.title | truncate: 20, '...' }}
```

Use `strip_html` before truncating rich product descriptions so that HTML tags
do not appear in the preview or affect its length.

#### `json`

Converts a Liquid value into valid JSON. It also adds the required quotation
marks and escapes special characters.

```liquid
<script>
  const productData = {{ product | json }};
</script>
```

Do not add quotation marks around a `json` result:

```liquid
{% comment %} Correct {% endcomment %}
const title = {{ product.title | json }};

{% comment %} Incorrect: creates double quotation marks {% endcomment %}
const title = "{{ product.title | json }}";
```

#### `money`

Formats an amount using the store's currency format:

```liquid
{{ product.price | money }}
{{ cart.total_price | money }}
```

Shopify price values are normally stored in the currency's smallest unit. For
example, a value of `1999` is formatted as a price such as `$19.99`, depending
on the store's currency and money format.

#### `default`

Returns a fallback when the original value is `nil`, `false`, or empty:

```liquid
{{ product.metafields.custom.subtitle.value | default: product.title }}
{{ section.settings.heading | default: 'Featured products' }}
```

If `false` is a meaningful value, preserve it with `allow_false`:

```liquid
{{ section.settings.show_badge | default: true, allow_false: true }}
```

#### `date`

Formats a date using `strftime` format codes:

```liquid
{{ article.published_at | date: '%B %d, %Y' }}
{{ 'now' | date: '%Y' }}
```

Example output:

```text
July 30, 2026
2026
```

Common format codes:

- `%d` — day, such as `30`
- `%m` — month number, such as `07`
- `%B` — full month name, such as `July`
- `%Y` — four-digit year, such as `2026`
- `%H:%M` — 24-hour time, such as `14:35`

### Chaining filters

Combine filters to complete several transformations. Read a chain from left to
right:

```liquid
{{ product.title | downcase | replace: ' ', '-' | prepend: 'product-' }}
```

For a title of `Blue Cotton Shirt`, the result is:

```text
product-blue-cotton-shirt
```

In this case, the shorter equivalent is:

```liquid
{{ product.title | handleize | prepend: 'product-' }}
```

## 4. Conditions

Use conditions to show content only when a rule is true:

```liquid
{% if section.settings.show_message %}
  <p>{{ section.settings.message }}</p>
{% endif %}
```

Common comparison operators:

- `==` means equal.
- `!=` means not equal.
- `>` and `<` compare numbers.
- `contains` checks whether a string or array contains a value.
- `and` requires both conditions.
- `or` requires either condition.

Example:

```liquid
{% if product.available and product.price < 5000 %}
  <p>Available for less than {{ 5000 | money }}</p>
{% endif %}
```

## 5. Loops

Use `for` to repeat markup:

```liquid
{% for product in collection.products limit: 4 %}
  <h3>{{ product.title }}</h3>
  <p>{{ product.price | money }}</p>
{% else %}
  <p>No products found.</p>
{% endfor %}
```

Inside a loop, `forloop.index` starts at 1 and `forloop.index0` starts at 0.

## 6. What is section schema?

A Shopify section is a `.liquid` file inside a theme's `sections` directory.
Its schema is JSON placed between `{% schema %}` and `{% endschema %}`.

Schema tells the Theme Editor:

- the section's display name;
- which editable settings it has;
- which repeatable blocks merchants can add;
- which preset makes the section available in **Add section**.

Basic structure:

```liquid
{% schema %}
{
  "name": "Example section",
  "tag": "section",
  "class": "example-section",
  "settings": [],
  "blocks": [],
  "presets": [
    {
      "name": "Example section"
    }
  ]
}
{% endschema %}
```

Important: the content inside a schema tag must be valid JSON. JSON does not
allow comments or trailing commas.

## 7. Section settings

Each setting needs a `type`, `id`, and usually a `label`:

```json
{
  "type": "text",
  "id": "heading",
  "label": "Heading",
  "default": "Welcome"
}
```

Read that value in Liquid with:

```liquid
{{ section.settings.heading }}
```

Useful setting types include:

- `text`
- `textarea`
- `richtext`
- `checkbox`
- `range`
- `select`
- `color`
- `image_picker`
- `url`
- `product`
- `collection`

## 8. Blocks

Blocks let a merchant add repeatable items, such as features, slides, or FAQ
questions.

Schema definition:

```json
{
  "type": "feature",
  "name": "Feature",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Feature title"
    }
  ]
}
```

Render blocks with a loop:

```liquid
{% for block in section.blocks %}
  <div {{ block.shopify_attributes }}>
    {{ block.settings.title }}
  </div>
{% endfor %}
```

`block.shopify_attributes` helps the Shopify Theme Editor identify and select
the correct block. Include it on the block's outer HTML element.

## 9. Understanding the example section

Open `basic-section.liquid`.

1. The first line creates a local `heading` variable from a section setting.
2. The `<section>` uses `section.id`, which is unique for each section instance.
3. An `if` statement avoids printing an empty heading.
4. The `escape` filter safely prints plain text.
5. The `for` loop renders every feature block.
6. Inline section-scoped CSS uses color and spacing settings.
7. The schema defines all Theme Editor controls.
8. The preset makes the section available in the Theme Editor.

## 10. Practice exercises

Try these changes one at a time:

1. Add a `text_alignment` select setting with `left`, `center`, and `right`.
2. Apply the selected value with `text-align`.
3. Add an `image_picker` setting to each feature block.
4. Render the image only when the merchant selects one.
5. Add a checkbox that can hide or show the entire feature list.

After every change, save the file and test both the storefront and Theme
Editor. If Shopify reports a schema error, first check quotation marks, commas,
brackets, unique setting IDs, and allowed defaults.
