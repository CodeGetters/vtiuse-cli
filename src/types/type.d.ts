export interface packInfo {
  version: string;
  description: string;
  command: string;
  action: (value?: any) => void;
}
