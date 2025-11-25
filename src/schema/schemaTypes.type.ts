
// custom 组件不做类型约束

export interface FormBuilderContext {
  values: Record<string, any>
}

export type ConfigProps =
  | Record<string, any>
  | ((context: FormBuilderContext) => Record<string, any>)

export interface ConfigItem {
  label: string;
  type: string;
  value: string;
  class?: string;
  style?: Record<string, string>
  defaultValue: number | boolean | string;
  props?: ConfigProps;
  cssVar?: string;
  unit?: string;
}

export interface SchemaSection {
  title: string;
  type: string;
  configs: ConfigItem[];
}


export type SchemaType = Record<string, SchemaSection>;