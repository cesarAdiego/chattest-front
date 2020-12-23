export class OperationResult<T> {
    result: T;
    operationErrors: string[];
    hasErrors: boolean;
}