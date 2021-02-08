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

// 这个必须有，将文件转化为模块
export {};

// ts-server会根据tsconfig的include去包含 d.ts/ts文件
// d.ts 文件分全局的和模块的
// 没有用到module语法的默认都是全局的
// 全局的你可以通过合并接口给window加属性 或者声明新的全局变量....
// 如果想在module级别的声明文件里修改全局的 才需要declare global ...
