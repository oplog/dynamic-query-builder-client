export type FilterOperation =
  | NumericFilterOperation
  | StringFilterOperation
  | DateFilterOperation
  | BooleanFilterOperation
  | ArrayFilterOperation
  | LogicalOperator;

export enum NumericFilterOperation {
  In = "In",
  Equals = "Equals",
  NotEqual = "NotEqual",
  LessThan = "LessThan",
  LessThanOrEqual = "LessThanOrEqual",
  GreaterThan = "GreaterThan",
  GreaterThanOrEqual = "GreaterThanOrEqual",
}

export enum LogicalOperator {
  None = "None",
  AndAlso = "AndAlso",
  OrElse = "OrElse",
  And = "And",
  Or = "Or",
  Xor = "Xor",
}

export enum StringFilterOperation {
  In = "In",
  Equals = "Equals",
  Contains = "Contains",
  NotEqual = "NotEqual",
  EndsWith = "EndsWith",
  StartsWith = "StartsWith",
}

export enum DateFilterOperation {
  Equals = "Equals",
  NotEqual = "NotEqual",
  GreaterThan = "GreaterThan",
  GreaterThanOrEqual = "GreaterThanOrEqual",
  LessThan = "LessThan",
  LessThanOrEqual = "LessThanOrEqual",
}

export enum BooleanFilterOperation {
  Equals = "Equals",
  NotEqual = "NotEqual",
}

export enum DecimalFilterOperation {
  Equals = "Equals",
  NotEqual = "NotEqual",
  LessThan = "LessThan",
  LessThanOrEqual = "LessThanOrEqual",
  GreaterThan = "GreaterThan",
  GreaterThanOrEqual = "GreaterThanOrEqual",
}

export enum ArrayFilterOperation {
  Any = "Any",
  All = "All",
}
