mod markdown;

use markdown::{parse_markdown_to_ast, AstNode};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_md_ast(input: &str) -> AstNode {
  let root = parse_markdown_to_ast(input);
  println!("ast node: {:?}", root);
  root
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_md_ast])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
