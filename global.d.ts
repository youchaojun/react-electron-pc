import { IpcRenderer, WebFrame, Screen, Shell, Remote } from 'electron';

declare global {
  interface UserModel {
    name: string;
  }
  interface ElectronIF {
    webFrame: WebFrame;
    screen: Screen;
    shell: Shell;
    remote: Remote;
  }
  // window上没有的属性也可以用 typeof window === 'object' && (window as any).方法名
  interface Window {
    less: any;
    BMap: any;
    BMapLib: any;
    polygon: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    ipcRenderer: IpcRenderer;
    electron: ElectronIF;
  }
}

export {};
