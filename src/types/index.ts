export interface packInfo {
  version: string;
  description: string;
  command: string;
  action: (value?: any) => void;
}

export interface projectInfoType {
  name: string;
}

export interface configType {
  [key: string]: string;
}
