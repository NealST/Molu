
pub mod html;

pub mod utils;

mod entities;
mod firstpass;
mod linklabel;
mod parse;
mod puncttable;
mod scanners;
mod strings;
mod tree;

use std::borrow::Cow;
use std::fmt::Display;

pub use crate::parse::{
  BrokenLink, BrokenLinkCallback, DefaultBrokenLinkCallback, OffsetIter, Parser, RefDefs,
};

pub use crate::strings::{CowStr, InlineStr};
pub use crate::utils::*;

// Codeblock type
#[derive(Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub enum CodeBlockType<'a> {
  Indented,
  // The value contained in the tag describes the language of the code, which may be empty.
  #[cfg_attr(feature = "serde", serde(borrow))]
  Fenced(CowStr<'a>),
}

impl<'a> CodeBlockType<'a> {
  pub fn is_indented(&self) -> bool {
    matches!(*self, CodeBlockType::Indented)
  }

  pub fn is_fenced(&self) -> bool {
    matches!(*self, CodeBlockType::Fenced(_))
  }

  pub fn into_static(self) -> CodeBlockType<'static> {
    match self {
      CodeBlockType::Indented => CodeBlockType::Indented,
      CodeBlockType::Fenced(s: CowStr<'_>) => CodeBlockType::Fenced(s.into_static())
    }
  }
}

// BlockQuote type (Note, Tip, Important, Warning, Caution)
#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord, Hash)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub enum BlockQuoteType {
  Note,
  Tip,
  Important,
  Warning,
  Caution,
}

// Metadata block type
#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord, Hash)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub enum MetadataBlockType {
  YamlStyle,
  PlusesStyle,
}

#[derive(Copy, Clone, Eq, PartialEq, Ord, PartialOrd, Hash, Debug)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub enum HeadingLevel {
    H1 = 1,
    H2,
    H3,
    H4,
    H5,
    H6,
}

impl Display for HeadingLevel {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::H1 => write!(f, "h1"),
            Self::H2 => write!(f, "h2"),
            Self::H3 => write!(f, "h3"),
            Self::H4 => write!(f, "h4"),
            Self::H5 => write!(f, "h5"),
            Self::H6 => write!(f, "h6"),
        }
    }
}

// Returned when trying to convert a `usize` into a `Heading` but it fails
// because the usize isn't a valid heading level
#[derive(Copy, Clone, Eq, PartialEq, Ord, PartialOrd, Hash, Debug)]
pub struct InvalidHeadingLevel(usize);

impl TryFrom<usize> for HeadingLevel {
    type Error = InvalidHeadingLevel;

    fn try_from(value: usize) -> Result<Self, Self::Error> {
        match value {
            1 => Ok(Self::H1),
            2 => Ok(Self::H2),
            3 => Ok(Self::H3),
            4 => Ok(Self::H4),
            5 => Ok(Self::H5),
            6 => Ok(Self::H6),
            _ => Err(InvalidHeadingLevel(value)),
        }
    }
}

// Type specifier for inline links. See [the Tag::Link](enum.Tag.html#variant.Link) for more information.
#[derive(Clone, Debug, PartialEq, Copy)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub enum LinkType {
    // Inline link like `[foo](bar)`
    Inline,
    // Reference link like `[foo][bar]`
    Reference,
    // Reference without destination in the document, but resolved by the broken_link_callback
    ReferenceUnknown,
    // Collapsed link like `[foo][]`
    Collapsed,
    // Collapsed link without destination in the document, but resolved by the broken_link_callback
    CollapsedUnknown,
    // Shortcut link like `[foo]`
    Shortcut,
    // Shortcut without destination in the document, but resolved by the broken_link_callback
    ShortcutUnknown,
    // Autolink like `<http://foo.bar/baz>`
    Autolink,
    // Email address in autolink like `<john@example.org>`
    Email,
}

impl LinkType {
    /// Map the link type to an equivalent _Unknown link type.
    fn to_unknown(self) -> Self {
        match self {
            LinkType::Reference => LinkType::ReferenceUnknown,
            LinkType::Collapsed => LinkType::CollapsedUnknown,
            LinkType::Shortcut => LinkType::ShortcutUnknown,
            _ => unreachable!(),
        }
    }
}

// Table column text alignment.
#[derive(Copy, Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]

pub enum Alignment {
    // Default text alignment.
    None,
    Left,
    Center,
    Right,
}

// Tags for elements that can contain other elements
#[derive(Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub enum Tag<'a> {
  // a paragragh of text and other inline elements
  Paragraph,

  // a heading,with optional identifier, classes and custom attributes
  // The identifier is prefixed with `#` and the last one in the attributes
  // list is chosen, classes are prefixed with `.` and custom attributes
  // have no prefix and can optionally have a value (`myattr` or `myattr=myvalue`).
  Heading {
    level: HeadingLevel,
    id: Option<CowStr<'a>>,
    classes: Vec<CowStr<'a>>,
    // The first item of the tuple is the attr and second one the value.
    attrs: Vec<(CowStr<'a>, Option<CowStr<'a>>)>,
  },

  BlockQuote(Option<BlockQuoteType>),
  // a code block
  CodeBlock(CodeBlockType<'a>),
  // html block
  HtmlBlock,
  // a list,if the list is ordered the field indicates the number of the first item.
  // contains only list items
  List(Option<u64>),
  // a list item
  Item,
  // A footnote definition. The value contained is the footnote's label by which it can
  // be referred to.
  #[cfg_attr(feature = "serde", serde(borrow))]
  FootnoteDefinition(CowStr<'a>),

  DefinitionList,
  DefinitionListTitle,
  DefinitionListDefinition,

  // A table. Contains a vector describing the text-alignment for each of its columns.
  Table(Vec<Alignment>),
  // A table header. Contains only `TableCell`s. Note that the table body starts immediately
  // after the closure of the `TableHead` tag. There is no `TableBody` tag.
  TableHead,
  // A table row. Is used both for header rows as body rows. Contains only `TableCell`s.
  TableRow,
  TableCell,

  // span-level tags
  Emphasis,
  Strong,
  Strikethrough,
  Superscript,
  Subscript,

  // a link
  Link {
    link_type: LinkType,
    dest_url: CowStr<'a>,
    title: CowStr<'a>,
    // Identifier of reference links, e.g. `world` in the link `[hello][world]`.
    id: CowStr<'a>,
  },

  // An image. The first field is the link type, the second the destination URL and the third is a title,
  // the fourth is the link identifier.
  Image {
    link_type: LinkType,
    dest_url: CowStr<'a>,
    title: CowStr<'a>,
    // Identifier of reference links, e.g. `world` in the link `[hello][world]`.
    id: CowStr<'a>,
  },

  // a metadata block
  MetadataBlock(MetadataBlockType)
}

impl<'a> Tag<'a> {
  pub fn to_end(&self) -> TagEnd {
    match self {
      Tag::Paragraph => TagEnd::Paragraph,
      Tag::Heading { level, .. } => TagEnd::Heading(*level),
      Tag::BlockQuote(kind) => TagEnd::BlockQuote(*kind),
      Tag::CodeBlock(_) => TagEnd::CodeBlock,
      Tag::HtmlBlock => TagEnd::HtmlBlock,
      Tag::List(number) => TagEnd::List(number.is_some()),
      Tag::Item => TagEnd::Item,
      Tag::FootnoteDefinition(_) => TagEnd::FootnoteDefinition,
      Tag::Table(_) => TagEnd::Table,
      Tag::TableHead => TagEnd::TableHead,
      Tag::TableRow => TagEnd::TableRow,
      Tag::TableCell => TagEnd::TableCell,
      Tag::Subscript => TagEnd::Subscript,
      Tag::Superscript => TagEnd::Superscript,
      Tag::Emphasis => TagEnd::Emphasis,
      Tag::Strong => TagEnd::Strong,
      Tag::Strikethrough => TagEnd::Strikethrough,
      Tag::Link { .. } => TagEnd::Link,
      Tag::Image { .. } => TagEnd::Image,
      Tag::MetadataBlock(kind) => TagEnd::MetadataBlock(*kind),
      Tag::DefinitionList => TagEnd::DefinitionList,
      Tag::DefinitionListTitle => TagEnd::DefinitionListTitle,
      Tag::DefinitionListDefinition => TagEnd::DefinitionListDefinition,
    }
  }

  pub fn into_static(self) -> Tag<'static> {
    match self {
      Tag::Paragraph => Tag::Paragraph,
      Tag::Heading {
        level,
        id,
        classes,
        attrs,
      } => Tag::Heading {
        level,
        id: id.map(|s| s.into_static()),
        classes: classes.into_iter().map(|s| s.into_static()).collect(),
        attrs: attrs
          .into_iter()
          .map(|(k, v)| (k.into_static(), v.map(|s| s.into_static())))
          .collect(),
      },
      Tag::BlockQuote(k) => Tag::BlockQuote(k),
      Tag::CodeBlock(kb) => Tag::CodeBlock(kb.into_static()),
      Tag::HtmlBlock => Tag::HtmlBlock,
      Tag::List(v) => Tag::List(v),
      Tag::Item => Tag::Item,
      Tag::FootnoteDefinition(a) => Tag::FootnoteDefinition(a.into_static()),
      Tag::Table(v) => Tag::Table(v),
      Tag::TableHead => Tag::TableHead,
      Tag::TableRow => Tag::TableRow,
      Tag::TableCell => Tag::TableCell,
      Tag::Emphasis => Tag::Emphasis,
      Tag::Strong => Tag::Strong,
      Tag::Strikethrough => Tag::Strikethrough,
      Tag::Superscript => Tag::Superscript,
      Tag::Subscript => Tag::Subscript,
      Tag::Link {
        link_type,
        dest_url,
        title,
        id,
      } => Tag::Link {
        link_type,
        dest_url: dest_url.into_static(),
        title: title.into_static(),
        id: id.into_static(),
      },
      Tag::Image {
        link_type,
        dest_url,
        title,
        id,
      } => Tag::Image {
        link_type,
        dest_url: dest_url.into_static(),
        title: title.into_static(),
        id: id.into_static(),
      },
      Tag::MetadataBlock(v) => Tag::MetadataBlock(v),
      Tag::DefinitionList => Tag::DefinitionList,
      Tag::DefinitionListTitle => Tag::DefinitionListTitle,
      Tag::DefinitionListDefinition => Tag::DefinitionListDefinition,
    }
  }
}

// the end of a tag
#[derive(Copy, Clone, Eq, PartialEq, Ord, PartialOrd, Hash, Debug)]
#[cfg_attr(feature = "serde", derive(Serialize, Deserialize))]
pub enum TagEnd {
  Paragraph,
  Heading(HeadingLevel),

  BlockQuote(Option<BlockQuoteType>),
  CodeBlock,

  HtmlBlock,

  // a list, true for ordered lists
  List(bool),
  Item,
  FootnoteDefinition,

  DefinitionList,
  DefinitionListTitle,
  DefinitionListDefinition,

  Table,
  TableHead,
  TableRow,
  TableCell,

  Emphasis,
  Strong,
  Strikethrough,
  Superscript,
  Subscript,

  Link,
  Image,

  MetadataBlock(MetadataBlockKind),
}

// make sure tagend is no more than two bytes in size
// this is why it's used instead of just using tag
#[cfg(target_pointer_width = "64")]
const _STATIC_ASSERT_TAG_END_SIZE: [(); 2] = [(); std::mem::size_of::<TagEnd>()];

impl<'a> From<Tag<'a>> for TagEnd {
    fn from(value: Tag) -> Self {
        value.to_end()
    }
}

