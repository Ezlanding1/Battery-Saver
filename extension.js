"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const path_1 = __importDefault(require("path"));
const vscode = __importStar(require("vscode"));
let fs = require('fs');
const POWER_SAVING_SETTINGS_FILE = path_1.default.join("src", "powerSavingSettings.json");
function on(dir) {
    const file = fs.readFileSync(path_1.default.join(dir, POWER_SAVING_SETTINGS_FILE));
    let powerSavingSettings = JSON.parse(file);
    Object.keys(powerSavingSettings).forEach((setting) => {
        vscode.workspace
            .getConfiguration()
            .update(setting, powerSavingSettings[setting], vscode.ConfigurationTarget.Global);
    });
}
;
function off(dir) {
    const file = fs.readFileSync(path_1.default.join(dir, POWER_SAVING_SETTINGS_FILE));
    let powerSavingSettings = JSON.parse(file);
    Object.keys(powerSavingSettings).forEach((setting) => {
        vscode.workspace
            .getConfiguration()
            .update(setting, undefined, vscode.ConfigurationTarget.Global);
    });
}
;
async function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("battery-saver.on", async () => {
        on(context.extensionUri.fsPath);
        context.globalState.update('battery-saver-state', true);
        vscode.window.showInformationMessage("Battery Saver Turned On");
    }));
    context.subscriptions.push(vscode.commands.registerCommand("battery-saver.off", async () => {
        off(context.extensionUri.fsPath);
        context.globalState.update('battery-saver-state', false);
        vscode.window.showInformationMessage("Battery Saver Turned Off");
    }));
    context.subscriptions.push(vscode.commands.registerCommand("battery-saver.toggle", async () => {
        context.globalState.get('battery-saver-state') == false ?
            vscode.commands.executeCommand('battery-saver.off') :
            vscode.commands.executeCommand('battery-saver.on');
        context.globalState.update('battery-saver-state', !context.globalState.get('battery-saver-state'));
    }));
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map