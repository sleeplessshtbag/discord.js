'use client';

import type { ApiItemKind } from '@microsoft/api-extractor-model';
import { VscSymbolClass } from '@react-icons/all-files/vsc/VscSymbolClass';
import { VscSymbolEnum } from '@react-icons/all-files/vsc/VscSymbolEnum';
import { VscSymbolInterface } from '@react-icons/all-files/vsc/VscSymbolInterface';
import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod';
import { VscSymbolVariable } from '@react-icons/all-files/vsc/VscSymbolVariable';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useMemo } from 'react';
import { useNav } from '~/contexts/nav';
import { ItemLink } from './ItemLink';
import { Section } from './Section';

export interface SidebarSectionItemData {
	href: string;
	kind: ApiItemKind;
	name: string;
	overloadIndex?: number | undefined;
}

interface GroupedMembers {
	Classes: SidebarSectionItemData[];
	Enums: SidebarSectionItemData[];
	Functions: SidebarSectionItemData[];
	Interfaces: SidebarSectionItemData[];
	Types: SidebarSectionItemData[];
	Variables: SidebarSectionItemData[];
}

function groupMembers(members: readonly SidebarSectionItemData[]): GroupedMembers {
	const Classes: SidebarSectionItemData[] = [];
	const Enums: SidebarSectionItemData[] = [];
	const Interfaces: SidebarSectionItemData[] = [];
	const Types: SidebarSectionItemData[] = [];
	const Variables: SidebarSectionItemData[] = [];
	const Functions: SidebarSectionItemData[] = [];

	for (const member of members) {
		switch (member.kind) {
			case 'Class':
				Classes.push(member);
				break;
			case 'Enum':
				Enums.push(member);
				break;
			case 'Interface':
				Interfaces.push(member);
				break;
			case 'TypeAlias':
				Types.push(member);
				break;
			case 'Variable':
				Variables.push(member);
				break;
			case 'Function':
				Functions.push(member);
				break;
			default:
				break;
		}
	}

	return { Classes, Functions, Enums, Interfaces, Types, Variables };
}

function resolveIcon(item: string) {
	switch (item) {
		case 'Classes':
			return <VscSymbolClass size={20} />;
		case 'Enums':
			return <VscSymbolEnum size={20} />;
		case 'Interfaces':
			return <VscSymbolInterface size={20} />;
		case 'Types':
		case 'Variables':
			return <VscSymbolVariable size={20} />;
		default:
			return <VscSymbolMethod size={20} />;
	}
}

export function Sidebar({ members }: { readonly members: SidebarSectionItemData[] }) {
	const segment = useSelectedLayoutSegment();
	const { setOpened } = useNav();

	const groupItems = useMemo(() => groupMembers(members), [members]);

	return (
		<div className="flex flex-col gap-3 p-3">
			{(Object.keys(groupItems) as (keyof GroupedMembers)[])
				.filter((group) => groupItems[group].length)
				.map((group, idx) => (
					<Section
						buttonClassName="bg-light-600 hover:bg-light-700 active:bg-light-800 dark:bg-dark-400 dark:hover:bg-dark-300 dark:active:bg-dark-400 focus:ring-width-2 focus:ring-blurple rounded p-3 outline-none focus:ring z-10"
						icon={resolveIcon(group)}
						key={`${group}-${idx}`}
						title={group}
					>
						{groupItems[group].map((member, index) => (
							<ItemLink
								className={`dark:border-dark-100 border-light-800 focus:ring-width-2 focus:ring-blurple ml-5 flex flex-col border-l p-[5px] pl-6 outline-none focus:rounded focus:border-0 focus:ring ${
									decodeURIComponent(segment ?? '') === member.href
										? 'bg-blurple text-white'
										: 'dark:hover:bg-dark-200 dark:active:bg-dark-100 hover:bg-light-700 active:bg-light-800'
								}`}
								itemURI={member.href}
								key={`${member.name}-${index}`}
								onClick={() => setOpened(false)}
								title={member.name}
							>
								<div className="flex flex-row place-items-center gap-2 lg:text-sm">
									<span className="truncate">{member.name}</span>
									{member.overloadIndex && member.overloadIndex > 1 ? (
										<span className="text-xs">{member.overloadIndex}</span>
									) : null}
								</div>
							</ItemLink>
						))}
					</Section>
				))}
		</div>
	);
}
