import path from 'path';
import * as vscode from 'vscode';
let fs = require('fs');

const POWER_SAVING_SETTINGS_FILE = path.join("src", "powerSavingSettings.json");

function on(dir: string) : void {

	const file: string = fs.readFileSync(path.join(dir, POWER_SAVING_SETTINGS_FILE));
	let powerSavingSettings = JSON.parse(file);
	
	Object.keys(powerSavingSettings).forEach((setting: string) => {
		vscode.workspace
			.getConfiguration()
			.update(setting, powerSavingSettings[setting], vscode.ConfigurationTarget.Global);
	});
};

function off(dir: string) : void {

	const file: string = fs.readFileSync(path.join(dir, POWER_SAVING_SETTINGS_FILE));
	let powerSavingSettings = JSON.parse(file);
	
	Object.keys(powerSavingSettings).forEach((setting: string) => {
		vscode.workspace
			.getConfiguration()
			.update(setting, undefined, vscode.ConfigurationTarget.Global);
	});
};

export async function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand(
		"battery-saver.on",
		async () => {
			on(context.extensionUri.fsPath);
			context.globalState.update('battery-saver-state', true);

			vscode.window.showInformationMessage(
				"Battery Saver Turned On"
			);
		}
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"battery-saver.off",
		async () => {
			off(context.extensionUri.fsPath);
			context.globalState.update('battery-saver-state', false);

			vscode.window.showInformationMessage(
				"Battery Saver Turned Off"
			);
		}
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"battery-saver.toggle",
		async () => {

			context.globalState.get('battery-saver-state') == false?
				vscode.commands.executeCommand('battery-saver.off') : 
				vscode.commands.executeCommand('battery-saver.on');

			context.globalState.update('battery-saver-state', !context.globalState.get('battery-saver-state'));
		}
	));
}

// This method is called when your extension is deactivated
export function deactivate() {}
