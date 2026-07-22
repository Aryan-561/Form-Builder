export type Option = {
  label: string;
  value: string;
};

export interface FormElement {
  id: number;
  name: string;
  type:
    | "text"
    | "textarea"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "select"
    | "multiselect"
    | "file"
    | "range"
    | "color"
    | "rating";

  label: string;
  placeholder: string;

  required: boolean;
  disabled: boolean;

  options?: Option[];

  min?: number;
  max?: number;
  step?: number;

  defaultValue?: string | number | boolean;
  uniqueId?: string;
}
