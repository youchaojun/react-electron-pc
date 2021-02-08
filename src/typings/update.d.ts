/**
 * 检测版本更新
 * 返回electron主线程中发返回的message
 */
export interface UpdateContentIF {
  current?: string;
  online?: string;
  text?: string;
}
/**
 * 下载进度
 */
export interface DownloadProgressIF {
  bytesPerSecond: number;
  percent: number;
  total: number;
  transferred: number;
}
