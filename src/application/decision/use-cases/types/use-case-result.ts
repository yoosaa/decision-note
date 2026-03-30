export type UseCaseError =
  | {
      type: "validation";
      issues: { field: string; message: string }[];
    }
  | {
      type: "not_found";
      message: string;
    }
  | {
      type: "unexpected";
      message: string;
    };

export type UseCaseResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: UseCaseError;
    };
