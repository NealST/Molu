use std::cmp::{max, min};
use std::collections::{HashMap, VecDeque};
use std::iter::FusedIterator;
use std::num::NonZeroUsize;
use std::ops::{Index, Range};

use unicase::UniCase;

use self::firstpass::run_first_pass;
use self::linklabel::{scan_link_label_rest, FootnoteLabel, LinkLabel, ReferenceLabel};
use self::scanners::*;
use self::strings::CowStr;
use self::tree::{Tree, TreeIndex};
use super::{
  Alignment, BlockQuoteType, CodeBlockType, HeadingLevel, LinkType, MetadataBlockType, Tag, TagEnd
};

#[derive(Debug, Default, Clone, Copy)]
pub struct Item {
  pub start: usize,
  pub end: usize,
  pub body: ItemBody,
}

#[derive(Debug, PartialEq, Clone, Copy, Default)]
pub enum ItemBody {
  // These are possible inline items, need to be resolved in second pass.

  // repeats, can_open, can_close
  MaybeEmphasis(usize, bool, bool),
  // can_open, can_close, brace context
  MaybeMath(bool, bool, u8),
  // quote byte, can_open, can_close
  MaybeSmartQuote(u8, bool, bool),
  // number of backticks,preceded by backslash
  MaybeCode(usize, bool),
  MaybeHtml,
  MaybeLinkOpen,
  // bool indicates whether or not the preceding section could be a reference
  MaybeLinkClose(bool),
  MaybeImage,

  // these are inline items after resolution
  Emphasis,
  Strong,
  Strikethrough,
  Superscript,
  Subscript,
  // true for display math
  Math(CowIndex, bool),
  Code(CowIndex),
  Link(LinkIndex),
  Image(LinkIndex),
  FootnoteReference(CowIndex),
  // true for checked
  TaskListMarker(bool),

  // these are also inline items
  InlineHtml,
  OwnedInlineHtml(CowIndex),
  SynthesizeText(CowIndex),
  SynthesizeChar(char),
  Html,
  Text {
    backslash_escaped: bool,
  },
  SoftBreak,
  // true for backslash
  HardBreak(bool),

  // Dummy node at the top of the tree - should not be used otherwise!
  #[default]
  Root,

  // these are block items
  Paragraph,
  Rule,
  // heading level
  Heading(HeadingLevel, Option<HeadingIndex>),
  FencedCodeBlock(CowIndex),
  IndentCodeBlock,
  HtmlBlock,
  BlockQuote(Option<BlockQuoteType>),
  List(bool, u8, u64),
  ListItem(usize),
  FootnoteDefinition(CowIndex),
  MetadataBlock(MetadataBlockType),

  // Definition lists
  DefinitionList(bool),
  MaybeDefinitionListTitle,
  DefinitionListTitle,
  DefinitionListDefinition(usize),

  // Tables
  Table(AlignmentIndex),
  TableHead,
  TableRow,
  TableCell,
}

impl ItemBody {
  fn is_maybe_inline(&self) -> bool {
    use ItemBody::*;
    matches!(*self, MaybeEmphasis(..)
    | MaybeMath(..)
    | MaybeSmartQuote(..)
    | MaybeCode(..)
    | MaybeHtml
    | MaybeLinkOpen
    | MaybeLinkClose(..)
    | MaybeImage)
  }

  fn is_inline(&self) -> bool {
    use ItemBody::*;
    matches!(*self, MaybeEmphasis(..)
    | MaybeMath(..)
    | MaybeSmartQuote(..)
    | MaybeCode(..)
    | MaybeHtml
    | MaybeLinkOpen
    | MaybeLinkClose(..)
    | MaybeImage
    | Emphasis
    | Strong
    | Strikethrough
    | Math(..)
    | Code(..)
    | Link(..)
    | Image(..)
    | FootnoteReference(..)
    | TaskListMarker(..)
    | InlineHtml
    | OwnedInlineHtml(..)
    | SynthesizeText(..)
    | SynthesizeChar(..)
    | Html
    | Text { .. }
    | SoftBreak
    | HardBreak(..))
  }

  fn is_block(&self) -> bool {
    !self.is_inline()
  }
}

#[derive(Debug)]
pub struct BrokenLink<'a> {
  pub span: std::ops::Range<usize>,
  pub link_type: LinkType,
  pub reference: CowStr<'a>,
}

impl<'a> BrokenLink<'a> {
    /// Moves the link into version with a static lifetime.
    ///
    /// The `reference` member is cloned to a Boxed or Inline version.
    pub fn into_static(self) -> BrokenLink<'static> {
        BrokenLink {
            span: self.span.clone(),
            link_type: self.link_type,
            reference: self.reference.into_string().into(),
        }
    }
}