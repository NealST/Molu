mod markdown;

use markdown::{Parser, Event};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn getMdAst(input: &str) {
  let parser = Parser::new(input);

  for event in parser {
    match event {
        Event::Start(tag) => println!("Start: {:?}", tag),
        Event::End(tag) => println!("End: {:?}", tag),
        Event::Text(text) => println!("Text: {}", text),
        Event::Code(code) => println!("Code: {}", code),
        Event::Html(html) => println!("Html: {}", html),
        Event::FootnoteReference(reference) => println!("FootnoteReference: {}", reference),
        _ => (),
    }
  }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![getMdAst])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
