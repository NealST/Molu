// 转化为 ast
use crate::markdown::{Parser, Event, Tag};
use tauri::ipc::{IpcResponse, InvokeResponseBody};
use serde::Serialize;

#[derive(Debug, Serialize)]
pub enum AstNode<'a> {
    Element { tag: Tag<'a>, children: Vec<AstNode<'a>> },
    Text(String),
    Code(String),
    Html(String),
    FootnoteReference(String),
}

#[derive(Debug, Serialize)]
enum HeadingLevel {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six
}

#[derive(Debug, Serialize)]
enum BlockType {
  Heading,
  Paragraph,
}

#[derive(Debug, Serialize)]
struct Meta {
  level: HeadingLevel,
}

#[derive(Debug, Serialize)]
pub struct AstEle {
  name: BlockType,
  meta: Meta,
  text: String,
  children: Vec<AstEle>
}

// add ipcResponse to make astnode available to return to the frontend
struct AstNodeWrapper<'a>(AstNode<'a>);

impl IpcResponse for AstNodeWrapper<'_> {
    fn body(self) -> Result<InvokeResponseBody, tauri::Error> {
        let json = serde_json::to_string(&self.0)?;
        Ok(InvokeResponseBody::Json(json))
    }  
}

pub fn parse_markdown_to_ast(markdown_input: &str) -> AstNode {
    let parser = Parser::new(markdown_input);
    let mut stack: Vec<AstNode> = Vec::new();
    let mut root = AstNode::Element { tag: Tag::Paragraph, children: Vec::new() };
    let mut newStack: Vec<AstEle> = Vec::new();
    let mut result: Vec<AstEle> = Vec::new();

    for event in parser {
        match event {
            Event::Start(tag) => {
                let element = AstNode::Element { tag, children: Vec::new() };
                stack.push(element);
            }
            Event::End(_) => {
                if let Some(mut node) = stack.pop() {
                    if let Some(parent) = stack.last_mut() {
                        if let AstNode::Element { children, .. } = parent {
                            children.push(node);
                        }
                        
                    } else {
                        if let AstNode::Element { children, .. } = &mut root {
                            children.push(node);
                        }
                    }
                }
            }
            Event::Text(text) => {
                if let Some(parent) = stack.last_mut() {
                    if let AstNode::Element { children, .. } = parent {
                        children.push(AstNode::Text(text.to_string()));
                    }
                }
            }
            Event::Code(code) => {
                if let Some(parent) = stack.last_mut() {
                    if let AstNode::Element { children, .. } = parent {
                        children.push(AstNode::Code(code.to_string()));
                    }
                }
            }
            Event::Html(html) => {
                if let Some(parent) = stack.last_mut() {
                    if let AstNode::Element { children, .. } = parent {
                        children.push(AstNode::Html(html.to_string()));
                    }
                }
            }
            Event::FootnoteReference(reference) => {
                if let Some(parent) = stack.last_mut() {
                    if let AstNode::Element { children, .. } = parent {
                        children.push(AstNode::FootnoteReference(reference.to_string()));
                    }
                }
            }
            _ => (),
        }
    }

    root
}
