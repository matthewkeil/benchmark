import {Opts} from "../types";
import {resolveHistoryLocation} from "./location";
import {LocalHistoryProvider} from "./local";
import {getGaCacheHistoryProvider} from "./gaCache";
import {IHistoryProvider} from "./provider";
import {optionsDefault} from "../options";
import {S3HistoryProvider} from "./s3";
export {resolveHistoryLocation};

export function getHistoryProvider(opts: Opts): IHistoryProvider {
  if (opts.historyLocal) {
    const dirpath = typeof opts.historyLocal === "string" ? opts.historyLocal : optionsDefault.historyLocalPath;
    return new LocalHistoryProvider(dirpath);
  }

  if (opts.historyGaCache) {
    const cacheKey = typeof opts.historyGaCache === "string" ? opts.historyGaCache : optionsDefault.historyCacheKey;
    return getGaCacheHistoryProvider(cacheKey);
  }

  if (opts.historyS3) {
    return new S3HistoryProvider({} as any);
  }

  throw Error("Must specify a history option");
}
