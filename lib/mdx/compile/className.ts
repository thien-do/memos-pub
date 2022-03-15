import { selectAll, Element, HastNode } from "hast-util-select";
import type { Transformer } from "unified";

const makeApplyElement = (className: string) => (element: Element) => {
	if (element.properties === undefined) element.properties = {};
	const props = element.properties;
	props.className = `${props.className ?? ""} ${className}`;
};

const toApplier = (change: Change): ((node: HastNode) => void) => {
	const applyElement = makeApplyElement(change.className);
	return (node: HastNode) => {
		selectAll(change.selector, node).forEach(applyElement);
	};
};

interface Change {
	selector: string;
	className: string;
}

export interface rehypeClassNameOptions {
	changes: Change[];
}

/**
 * martypdx/rehype-add-classes rewritten in TS
 * See: https://github.com/martypdx/rehype-add-classes/blob/master/index.mjs
 */
export const rehypeClassName = (
	options: rehypeClassNameOptions
): Transformer<HastNode> => {
	const appliers = options.changes.map(toApplier);
	return (node): void => {
		appliers.forEach((apply) => apply(node));
	};
};
