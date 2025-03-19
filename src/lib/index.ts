export interface FragmentObject {
	text: string;
	length: number;
}

/**
 * Given string content, split into a series of fragments. How splitting
 * is achieved depends on the `maxLineLength` and `useSourceLines` settings
 */
export function getFragments(
	content: string,
	maxLineLength: number,
	useSourceLines: boolean = false
): FragmentObject[] {
	if (!content.length) {
		return [];
	}
	if (useSourceLines) {
		return findFragmentsBySourceLines(content.slice());
	}
	return findFragmentsByLineLength(content.slice(), maxLineLength);
	// return segments.flat()
}

/**
 * Splits content using source newlines
 */
function findFragmentsBySourceLines(content: string): FragmentObject[] {
	return content
		.split('\n')
		.filter((l) => Boolean(l.trim()))
		.map((l) => serializeFragment([l.trim()]));
}

/**
 * Splits up by double line breaks (ie: paragraph splits), applies some filtering,
 * then uses word splits to try creating new "lines" up to `maxLineLength`
 */
function findFragmentsByLineLength(content: string, maxLineLength: number): FragmentObject[] {
	const fragments: FragmentObject[] = [];

	const lines = content.split('\n\n').filter(Boolean);

	lines.forEach((line) => {
		let currSeg: string[] = [];
		let currLen = 0;
		// drop single newlines, then split on words
		const subseg = line.replace('\n', ' ').trim().split(/\s+/);
		subseg.forEach((seg) => {
			if (currLen > maxLineLength) {
				const prev = currSeg.pop();
				fragments.push(serializeFragment(currSeg));
				if (prev) {
					currSeg = [prev];
					currLen = prev.length + 1;
				}
			}
			currLen += seg.length + 1;
			currSeg.push(seg);
		});
		if (currSeg.length > 0) {
			fragments.push(serializeFragment(currSeg));
		}
	});

	return fragments;
}

function serializeFragment(frag: string[]): FragmentObject {
	const text = frag.join(' ');
	return { text, length: text.length };
}

/**
 * Naïvely search in fragments for a string
 *
 * @param {FragmentObject[]} fragments
 * @param {string} searchText
 * @param {number} start
 * @param {boolean} backwards
 */
export function findInFragments(
	fragments: FragmentObject[],
	searchText: string,
	start: number = 0,
	backwards: boolean = false
): number {
	if (backwards) {
		start = fragments.length - start - 1;
		fragments = fragments.slice();
		fragments.reverse();
	}
	const searchLower = searchText.toLowerCase();
	for (let i = start; i < fragments.length; i++) {
		const { text } = fragments[i];
		if (text.toLowerCase().includes(searchLower)) {
			if (backwards) {
				return fragments.length - i - 1;
			}
			return i;
		}
	}
	return -1;
}
