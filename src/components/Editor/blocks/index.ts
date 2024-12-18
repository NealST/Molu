
import Heading from "./Heading.svelte";
import Paragraph from "./Paragraph.svelte";
import Diagram from "./Diagram.svelte";
import CodeBlock from "./CodeBlock.svelte";
import Math from "./Math.svelte";
import Html from "./Html.svelte";
import Table from "./Table.svelte";
import OrderList from "./OrderList.svelte";
import BulletList from "./BulletList.svelte";
import TaskList from "./TaskList.svelte";
import TaskListItem from "./TaskListItem.svelte";
import ThematicBreak from "./ThematicBreak.svelte";
import BlockQuote from "./BlockQuote.svelte";
import ListItem from "./ListItem.svelte";

const blockMap = {
  'heading': Heading,
  'paragraph': Paragraph,
  'diagram': Diagram,
  'code-block': CodeBlock,
  'math-block': Math,
  'html': Html,
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
