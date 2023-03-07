import { runAppleScript } from "run-applescript";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  sshUsername: string;
}

export async function sshToTailscaleDevice(deviceName: string) {
  try {
    const userName = getPreferenceValues<Preferences>().sshUsername;
    const target = userName ? `${userName}@${deviceName}` : deviceName;
    const script = `
    tell application "Terminal"
      activate
      set newTab to do script "ssh ${target}"
      set current settings of newTab to settings set "Grass"
    end tell
  `;

    await runAppleScript(script);
  }
  catch (error) {
    console.error(error);
    throw error
  }
}

export async function screenShareTailscaleDevice(deviceName: string) {
  try {
    const script = `
    tell application "Screen Sharing"
      activate
      tell application "System Events"
        keystroke "${deviceName}"
        keystroke return
      end tell
    end tell
  `;

    await runAppleScript(script);
  }
  catch (error) {
    console.error(error);
    throw error
  }
}