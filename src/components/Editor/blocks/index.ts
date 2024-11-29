import Frontmatter from "./extra/Frontmatter.svelte";
import AtxHeading from "./commonMark/AtxHeading.svelte";
import Paragraph from "./commonMark/Paragraph.svelte";
import SetextHeading from "./commonMark/SetextHeading.svelte";
import Diagram from "./extra/Diagram.svelte";
import CodeBlock from "./commonMark/CodeBlock.svelte";
import Math from "./extra/Math.svelte";
import Html from "./commonMark/Html.svelte";
import Table from "./gfm/Table.svelte";
import OrderList from "./commonMark/OrderList.svelte";
import BulletList from "./commonMark/BulletList.svelte";
import TaskList from "./gfm/TaskList.svelte";
import TaskListItem from "./gfm/TaskListItem.svelte";
import ThematicBreak from "./commonMark/ThematicBreak.svelte";
import BlockQuote from "./commonMark/BlockQuote.svelte";
import ListItem from "./commonMark/ListItem.svelte";

const blockMap = {
  'frontmatter': Frontmatter,
  'atx-heading': AtxHeading,
  'paragraph': Paragraph,
  'setext-heading': SetextHeading,
  'diagram': Diagram,
  'code-block': CodeBlock,
  'math-block': Math,
  'html-block': Html,
  'table': Table,
  'order-list': OrderList,
  'list-item': ListItem,
  'bullet-list': BulletList,
  'task-list': TaskList,
  'task-list-item': TaskListItem,
  'thematic-break': ThematicBreak,
  'block-quote': BlockQuote,
};

export default blockMap;
