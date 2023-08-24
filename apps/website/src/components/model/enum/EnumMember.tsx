import type { ApiEnumMember } from '@microsoft/api-extractor-model';
import { CodeHeading } from '~/components/CodeHeading';
import { SignatureText } from '../../SignatureText';
import { TSDoc } from '../../documentation/tsdoc/TSDoc';

export function EnumMember({ member }: { readonly member: ApiEnumMember }) {
	return (
		<div className="flex flex-col scroll-mt-30" id={member.displayName}>
			<CodeHeading className="md:-ml-8.5" href={`#${member.displayName}`}>
				{member.name}
				<span>=</span>
				{member.initializerExcerpt ? (
					<SignatureText excerpt={member.initializerExcerpt} model={member.getAssociatedModel()!} />
				) : null}
			</CodeHeading>
			{member.tsdocComment ? <TSDoc item={member} tsdoc={member.tsdocComment.summarySection} /> : null}
		</div>
	);
}
