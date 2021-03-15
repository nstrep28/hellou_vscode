"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fish_1 = require("./fish");
const model_1 = require("./model");
function activate(context) {
    console.log('[vscode-fish-text] Activated!');
    let htmlSpecificLanguages = [
        'html',
        'javascriptreact',
        'typescriptreact'
    ];
    let languages = [
        ...htmlSpecificLanguages,
        'handlebars',
        'plaintext',
        'php',
        'markdown',
        'jade'
    ];
    let provider = vscode.languages.registerCompletionItemProvider(languages, {
        provideCompletionItems() {
            return fish_1.getFishTextCompletions(model_1.MAX_PARAGRAPHS);
        }
    });
    let htmlSpecificProvider = vscode.languages.registerCompletionItemProvider(htmlSpecificLanguages, {
        provideCompletionItems() {
            return fish_1.getFishHTMLCompletions(model_1.MAX_PARAGRAPHS);
        }
    });
    let pugSpecificProvider = vscode.languages.registerCompletionItemProvider('jade', {
        provideCompletionItems() {
            return fish_1.getFishJadeCompletions(model_1.MAX_PARAGRAPHS);
        }
    });
    context.subscriptions.push(provider, htmlSpecificProvider, pugSpecificProvider);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map