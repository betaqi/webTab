import type { ConfigItem } from "./schemaTypes.type";

// 过滤type中 包含 custom 的配置项
export function filterCustomConfigs(configs: ConfigItem[]) {
  return configs.filter(config => !config.type.includes('custom'));
}