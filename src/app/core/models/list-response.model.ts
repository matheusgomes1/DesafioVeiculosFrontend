export class ListResponse<T> {
  items: T[];
  pageNumber: boolean;
  pageSize: boolean;
  totalItems: number;
  totalPages: number;
}