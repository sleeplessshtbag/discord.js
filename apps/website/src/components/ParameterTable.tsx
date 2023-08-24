import type { ApiDocumentedItem, ApiParameterListMixin } from '@microsoft/api-extractor-model';
import { useMemo } from 'react';
import { resolveParameters } from '~/util/model';
import { ExcerptText } from './ExcerptText';
import { Table } from './Table';
import { TSDoc } from './documentation/tsdoc/TSDoc';

const columnStyles = {
	Name: 'font-mono whitespace-nowrap',
	Type: 'font-mono whitespace-pre-wrap break-normal',
};

export function ParameterTable({ item }: { readonly item: ApiDocumentedItem & ApiParameterListMixin }) {
	const params = resolveParameters(item);

	const rows = useMemo(
		() =>
			params.map((param) => ({
				Name: param.name,
				Type: <ExcerptText excerpt={param.parameterTypeExcerpt} model={item.getAssociatedModel()!} />,
				Optional: param.isOptional ? 'Yes' : 'No',
				Description: param.description ? <TSDoc item={item} tsdoc={param.description} /> : 'None',
			})),
		[item, params],
	);

	return (
		<div className="overflow-x-auto">
			<Table columnStyles={columnStyles} columns={['Name', 'Type', 'Optional', 'Description']} rows={rows} />
		</div>
	);
}
