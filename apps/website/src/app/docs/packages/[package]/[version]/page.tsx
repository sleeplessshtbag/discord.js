import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { SerializeOptions } from 'next-mdx-remote/dist/types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { SyntaxHighlighter } from '~/components/SyntaxHighlighter';
import type { VersionRouteParams } from './layout';

async function loadREADME(packageName: string) {
	return readFile(join(process.cwd(), 'src', 'assets', 'readme', packageName, 'home-README.md'), 'utf8');
}

const mdxOptions = {
	mdxOptions: {
		remarkPlugins: [remarkGfm],
		remarkRehypeOptions: { allowDangerousHtml: true },
		rehypePlugins: [rehypeRaw, rehypeSlug],
		format: 'md',
	},
} satisfies SerializeOptions;

export default async function Page({ params }: { params: VersionRouteParams }) {
	const { package: packageName } = params;
	const readmeSource = await loadREADME(packageName);

	return (
		<div className="max-w-none prose">
			{/* @ts-expect-error SyntaxHighlighter is assignable */}
			<MDXRemote components={{ pre: SyntaxHighlighter }} options={mdxOptions} source={readmeSource} />
		</div>
	);
}
