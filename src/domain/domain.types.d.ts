export interface IListData<T> {
	skip?: number;
	limit?: number;
	sort?: Array<{
		field: keyof T;
		order?: 'asc' | 'desc';
	}>;
}

export interface IListResult<T> {
	total: number;
	items: T[];
}
