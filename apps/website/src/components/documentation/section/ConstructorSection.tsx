import type { ApiConstructor } from '@microsoft/api-extractor-model';
import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod';
import { CodeHeading } from '~/components/CodeHeading';
import { ParameterTable } from '../../ParameterTable';
import { TSDoc } from '../tsdoc/TSDoc';
import { parametersString } from '../util';
import { DocumentationSection } from './DocumentationSection';

export function ConstructorSection({ item }: { readonly item: ApiConstructor }) {
	return (
		<DocumentationSection icon={<VscSymbolMethod size={20} />} padded title="Constructor">
			<div className="flex flex-col gap-2">
				<CodeHeading>{`constructor(${parametersString(item)})`}</CodeHeading>
				{item.tsdocComment ? <TSDoc item={item} tsdoc={item.tsdocComment} /> : null}
				<ParameterTable item={item} />
			</div>
		</DocumentationSection>
	);
}
