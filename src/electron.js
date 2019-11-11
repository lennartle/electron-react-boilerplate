/* eslint-disable*/

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
    // resizable: false,
    // backgroundColor: "#191919",
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    if (isDev) {
      mainWindow.openDevTools();

      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS
      } = require("electron-devtools-installer");

      installExtension([REACT_DEVELOPER_TOOLS]);
      installExtension([REDUX_DEVTOOLS]);
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
