"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const speech_code_1 = require("speech-code");
exports.fishTextCompletionFactory = (metadata) => {
    const { prefix, documentation, documentationVariants, beforeText = '', afterText = '' } = metadata;
    return (amount = 3) => {
        const completionItem = new vscode_1.CompletionItem(prefix.ru);
        completionItem.insertText = new vscode_1.SnippetString(`${beforeText}${speech_code_1.getParagraph(3)}${afterText}`);
        if (documentation && documentation.ru) {
            completionItem.documentation = new vscode_1.MarkdownString(documentation.ru);
        }
        const completionItemEng = new vscode_1.CompletionItem(prefix.en);
        completionItemEng.insertText = new vscode_1.SnippetString(`${beforeText}${speech_code_1.getParagraph(3)}${afterText}`);
        if (documentation && documentation.en) {
            completionItemEng.documentation = new vscode_1.MarkdownString(documentation.en);
        }
        let result = [completionItem, completionItemEng];
        for (let i = 1; i <= amount; i++) {
            let completion = new vscode_1.CompletionItem(`${prefix.ru}${i}`);
            completion.insertText = new vscode_1.SnippetString(`${beforeText}${speech_code_1.getParagraph(i)}${afterText}`);
            if (documentationVariants && documentationVariants.ru) {
                completion.documentation = new vscode_1.MarkdownString(documentationVariants.ru.replace('{i}', i.toString()));
            }
            let completionEng = new vscode_1.CompletionItem(`${prefix.en}${i}`);
            completionEng.insertText = new vscode_1.SnippetString(`${beforeText}${speech_code_1.getParagraph(i)}${afterText}`);
            if (documentationVariants && documentationVariants.en) {
                completionEng.documentation = new vscode_1.MarkdownString(documentationVariants.en.replace('{i}', i.toString()));
            }
            result.push(completion, completionEng);
        }
        return result;
    };
};
//# sourceMappingURL=get-completions-factory.js.map