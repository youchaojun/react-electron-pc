const { app, BrowserWindow, Menu, ipcMain, shell, screen } = require('electron');
const path = require('path'),
  url = require('url'),
  log = require('electron-log');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = log;
// 手动更新
// autoUpdater.autoDownload = false;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const feedURL = '存放electron下载的地址';

let win, mainWindow, childWin;
const sendStatusToWindow = (text) => {
  log.info(text);
  win.webContents.send('message', text);
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      // nativeWindowOpen: true,
    },
    // 是否显示关闭按钮
    frame: false,
    maximizable: false,
    resizable: false,
    center: true,
  });

  childWin = new BrowserWindow({
    parent: mainWindow,
    width: 400,
    height: 500,
    frame: false,
    maximizable: false,
    resizable: false,
    center: true,
  });

  let startUrl = '';
  if (!app.isPackaged) {
    startUrl = 'http://localhost:3000';
  } else {
    startUrl = url.format({
      pathname: path.join(__dirname, './loading.html'),
      protocol: 'file:',
      slashes: true,
    });
  }
  // 清除缓存项
  const clearObj = {
    storages: [
      'appcache',
      'filesystem',
      'indexdb',
      'localstorage',
      'sessionstorage',
      'shadercache',
      'websql',
      'serviceworkers',
      'cachestorage',
    ],
  };

  let childUrl = url.format({
    pathname: path.join(__dirname, './loading.html'),
    protocol: 'file:',
    slashes: true,
  });
  childWin.loadURL(childUrl);
  mainWindow.loadURL(startUrl);
  // 开发模式
  // mainWindow.webContents.openDevTools();
  // 菜单定制
  const template = [
    {
      label: '视图',
      submenu: [
        {
          label: '缩小',
          role: 'zoomin',
        },
        { label: '放大', role: 'zoomout' },
        { label: '重置缩放', role: 'resetzoom' },
        {
          type: 'separator',
        },
        {
          label: '全屏',
          role: 'togglefullscreen',
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { label: '复制', accelerator: 'Ctrl+C', selector: 'copy:' },
        { label: '粘贴', accelerator: 'Ctrl+V', selector: 'paste:' },
      ],
    },
    {
      label: '关于我们',
      submenu: [
        { label: '当前版本 V ' + app.getVersion() },
        {
          label: '关于我们',
          click() {
            shell.openExternal('http://www.xxxxx.net/companyProfile');
          },
        },
      ],
    },
  ];
  const m = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(m);
  mainWindow.on('close', () => {
    mainWindow.webContents.session.clearStorageData(clearObj);
    mainWindow = null;
    app.exit();
  });
  return mainWindow;
};

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const checkForUpdates = () => {
  autoUpdater.setFeedURL(feedURL);

  autoUpdater.on('error', function (err) {
    sendStatusToWindow({ text: '检查更新出错' + err });
  });
  autoUpdater.on('checking-for-update', function () {
    sendStatusToWindow('正在检查更新……');
  });
  autoUpdater.on('update-available', function (info) {
    sendStatusToWindow({ online: info.version });
  });
  autoUpdater.on('update-not-available', function () {
    sendStatusToWindow({ text: '现在使用的就是最新版本，不用更新' });
  });
  // 监听下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    win.webContents.send('downloadProgress', progressObj);
  });
  autoUpdater.on('update-downloaded', function () {
    sendStatusToWindow({ text: '下载完成，开始自动安装' });
    autoUpdater.quitAndInstall();
  });

  ipcMain.on('checkForUpdate', () => {
    if (process.env.NODE_ENV !== 'development') {
      // 执行自动检查更新
      autoUpdater.checkForUpdates();
    }
  });
  autoUpdater.checkForUpdatesAndNotify();
};

// 接收最小化命令
ipcMain.on('window-min', function () {
  mainWindow.minimize();
});
// 接收最大化命令
ipcMain.on('window-max', function () {
  if (mainWindow.isFullScreen()) {
    mainWindow.setFullScreen(false);
  } else {
    mainWindow.setFullScreen(true);
  }
});
// 关闭窗口
ipcMain.on('closeWindow', () => {
  mainWindow.close();
});

// 设置登录页面的窗口大小
ipcMain.on('login-window', () => {
  childWin.hide();
  mainWindow.setSize(400, 500);
  mainWindow.center();
  mainWindow.setResizable(false);
});

// 设置非登录页面的窗口大小
ipcMain.on('other-window', () => {
  // 获取当前屏幕的尺寸
  const width = screen.getPrimaryDisplay().workAreaSize.width;
  const height = screen.getPrimaryDisplay().workAreaSize.height;
  mainWindow.setSize(width, height);
  mainWindow.center();
  mainWindow.setResizable(true);
});

// 清除缓存
app.commandLine.appendSwitch('--disable-http-cache');
app.on('ready', function () {
  win = createWindow();
  // checkForUpdates(); // 关闭更新检测
});
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
