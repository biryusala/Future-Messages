export interface IStepList {
  value: string;
  state: number;
  validate: () => boolean;
  additionalAction?: () => any;
  isError?: boolean;
  isFinishState?: boolean;
}