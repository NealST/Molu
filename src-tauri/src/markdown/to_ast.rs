// 转化为 ast
use crate::markdown::{Parser, Event, Tag};
use std::collections::HashMap;

#[derive(Debug)]
enum AstNode<'a> {
    Element { tag: Tag<'a>, children: Vec<AstNode<'a>> },
    Text(String),
    Code(String),
    Html(String),
    FootnoteReference(String),
}

pub fn parse_markdown_to_ast(markdown_input: &str) -> AstNode {
    let parser = Parser::new(markdown_input);
    let mut stack: Vec<AstNode> = Vec::new();
    let mut root = AstNode::Element { tag: Tag::Paragraph, children: Vec::new() };

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
