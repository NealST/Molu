export const defaultState = [
  {
    name: 'heading',
    meta: {
      level: 1,
    },
    text: 'Inline Format'
  },
  {
    name: 'paragraph',
    children: [
      {
        name: 'strong',
        text: 'strong'
      },
      {
        name: 'plain',
        text: ' ',
      },
      {
        name: 'em',
        text: 'emphasis'
      },
      {
        name: 'plain',
        text: ' ',
      },
      {
        name: 'code',
        text: 'inline code'
      },
      {
        name: 'plain',
        text: ' &gt; '
      },
      {
        name: 'html',
        text: '<u>underline</u>'
      },
      {
        name: 'plain',
        text: ' ',
      },
      {
        name: 'html',
        text: '<mark>highlight</mark>'
      },
      {
        name: 'plain',
        text: ' ',
      },
      {
        name: 'html',
        text: '<ruby>北京<rt>Beijing</rt></ruby>'
      },
      {
        name: 'link',
        text: 'Baidu',
        href: 'http://www.baidu.com'
      },
      {
        name: 'plain',
        text: ' H0~2~ X^5^',
      },
    ]
  },
  {
    name: 'paragraph',
    children: [
      {
        name: 'plain',
        text: ':man:  ~~del~~ http://google.com $a \\ne b$'
      }
    ]
  }
]

export const DEFAULT_STATE = [
  {
    name: "atx-heading",
    meta: {
      level: 1, // 1 ~ 6
    },
    text: "# Inline Format", // can not contain `\n`!
  },
  {
    name: "paragraph", 
    text: "**strong** *emphasis* `inline code` &gt; <u>underline</u> <mark>highlight</mark> <ruby>北京<rt>Beijing</rt></ruby> [Baidu](http://www.baidu.com) H0~2~ X^5^",
  },
  {
    name: "paragraph",
    text: ":man:  ~~del~~ http://google.com $a \\ne b$",
  },
  {
    name: "atx-heading",
    meta: {
      level: 1, // 1 ~ 6
    },
    text: "# Line Break", // can not contain `\n`!
  },
  {
    name: "paragraph",
    text: `soft line break
hard line break  
line end`,
  },
  {
    name: "diagram",
    text: `mermaid TD
    A[Hard] -->|Text| B(Round)
    B --> C{Decision}
    C -->|One| D[Result 1]
    C -->|Two| E[Result 2]`,
    meta: {
      lang: "yaml",
      type: "mermaid",
    },
  },
  {
    name: "diagram",
    text: `@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response
@enduml`,
    meta: {
      lang: "yaml",
      type: "plantuml",
    },
  },
  // Indented code blocks and Fenced code blocks
  {
    name: "code-block",
    meta: {
      type: "indented", // indented or fenced
      lang: "javascript", // lang will be empty string if block is indented block. set language will auto change into fenced code block.
    },
    text: "const foo = `bar`",
  },
  {
    name: "math-block",
    text: "a \\ne b",
    meta: {
      mathStyle: "",
    },
  },
  // Table
  {
    name: "table",
    children: [
      {
        name: "table.row",
        children: [
          {
            name: "table.cell",
            meta: {
              align: "right", // none left center right, cells in the same column has the same alignment.
            },
            text: "foo",
          },
          {
            name: "table.cell",
            meta: {
              align: "none", // none left center right, cells in the same column has the same alignment.
            },
            text: "bar",
          },
        ],
      },
      {
        name: "table.row",
        children: [
          {
            name: "table.cell",
            meta: {
              align: "right", // none left center right, cells in the same column has the same alignment.
            },
            text: "zar",
          },
          {
            name: "table.cell",
            meta: {
              align: "none", // none left center right, cells in the same column has the same alignment.
            },
            text: "foo bar",
          },
        ],
      },
    ],
  },
  // Indented code blocks and Fenced code blocks
  // Order List Blocks
  {
    name: "order-list",
    meta: {
      start: 0, // 0 ~ 999999999
      loose: true, // true or false, true is loose list and false is tight.
      delimiter: ".", // . or )
    },
    children: [
      // List Item
      {
        name: "list-item", // Can contains any type and number of leaf blocks.
        children: [
          {
            name: "paragraph",
            text: "foo\nbar",
          },
        ],
      },
    ],
  },
  // Bullet List Blocks
  {
    name: "bullet-list",
    meta: {
      marker: "-", // - + *
      loose: false, // true or false
    },
    children: [
      // List Item
      {
        name: "list-item", // Can contains any type and number of leaf blocks.
        children: [
          {
            name: "paragraph",
            text: "foo bar1",
          },
          {
            name: "paragraph",
            text: "foo bar2",
          },
        ],
      },
    ],
  },
  // Task List
  {
    name: "task-list",
    meta: {
      marker: "-", // - + *
    },
    children: [
      {
        name: "task-list-item",
        meta: {
          checked: false, // true or false
        },
        children: [
          {
            name: "paragraph",
            text: "a",
          },
        ],
      },
      {
        name: "task-list-item",
        meta: {
          checked: true, // true or false
        },
        children: [
          {
            name: "paragraph",
            text: "b",
          },
        ],
      },
      {
        name: "task-list-item",
        meta: {
          checked: false, // true or false
        },
        children: [
          {
            name: "paragraph",
            text: "c",
          },
        ],
      },
      {
        name: "task-list-item",
        meta: {
          checked: false, // true or false
        },
        children: [
          {
            name: "paragraph",
            text: "d",
          },
        ],
      },
    ],
  },
  // Block quotes
  {
    name: "block-quote",
    children: [
      {
        // Can contains any type and number of leaf blocks.
        name: "paragraph",
        text: "foo\nbar",
      },
    ],
  },
  {
    name: "paragraph",
    text: "![](https://jingan2.guankou.net/haopic/jj20/389023/010323033238341796.jpg)",
  },
];

export const DEFAULT_MARKDOWN = `---
title: muya
author: jocs
---

# Inline Format

**strong** *emphasis* \`inline code\` &gt; <u>underline</u> <mark>highlight</mark> <ruby>北京<rt>Beijing</rt></ruby> [Baidu](http://www.baidu.com) H0~2~ X^5^

GitHub and Extra
Inline format
===

:man:  ~~del~~ http://google.com $a \\ne b$

# Line Break

soft line break
hard line break  
line end

    const a = "nice"
    function add(){}

\`\`\`
const b = "foo"
\`\`\`

\`\`\`math
a \\ne b
\`\`\`

\`\`\`mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
\`\`\`

\`\`\`vega-lite
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A basic bar chart example, with value labels shown upon pointer hover.",
  "width": 400,
  "height": 200,
  "padding": 5,

  "data": [
    {
      "name": "table",
      "values": [
        {"category": "A", "amount": 28},
        {"category": "B", "amount": 55},
        {"category": "C", "amount": 43},
        {"category": "D", "amount": 91},
        {"category": "E", "amount": 81},
        {"category": "F", "amount": 53},
        {"category": "G", "amount": 19},
        {"category": "H", "amount": 87}
      ]
    }
  ],

  "signals": [
    {
      "name": "tooltip",
      "value": {},
      "on": [
        {"events": "rect:pointerover", "update": "datum"},
        {"events": "rect:pointerout",  "update": "{}"}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "width",
      "padding": 0.05,
      "round": true
    },
    {
      "name": "yscale",
      "domain": {"data": "table", "field": "amount"},
      "nice": true,
      "range": "height"
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale" },
    { "orient": "left", "scale": "yscale" }
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data":"table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "category"},
          "width": {"scale": "xscale", "band": 1},
          "y": {"scale": "yscale", "field": "amount"},
          "y2": {"scale": "yscale", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "align": {"value": "center"},
          "baseline": {"value": "bottom"},
          "fill": {"value": "#333"}
        },
        "update": {
          "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
          "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
          "text": {"signal": "tooltip.amount"},
          "fillOpacity": [
            {"test": "datum === tooltip", "value": 0},
            {"value": 1}
          ]
        }
      }
    }
  ]
}
\`\`\`

\`\`\`plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response
@enduml
\`\`\`

\`\`\`javascript
const foo = \`bar\`
\`\`\`

$$
a \\ne b
$$

<div>
foo bar
</div>

| foo | bar     |
| ---:| ------- |
| zar | foo\\|bar |

0. foo
   bar
- foo bar1
  
  foo bar2

- [ ] a
- [x] b
- [ ] c
- [ ] d

---

> foo
> bar

![](https://jingan2.guankou.net/haopic/jj20/389023/010323033238341796.jpg)IMAGE`;

export const TEST_MARKDOWN = `
# Inline Format

**strong** *emphasis* \`inline code\` &gt; <u>underline</u> <mark>highlight</mark> <ruby>北京<rt>Beijing</rt></ruby> [Baidu](http://www.baidu.com) H0~2~ X^5^

:man:  ~~del~~ http://google.com $a \\ne b$
`
