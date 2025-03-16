
/**
 * @typedef {object} SegmentObject
 * @property {string} text
 * @property {number} length
 */

/**
 * Given string content, a current character position, and the max line length,
 * tries to break into "lines" that split cleanly on words.
 * 
 * @param {string} content 
 * @param {number} maxLineLength 
 * @returns {SegmentObject[]}
 */
export function getSegments(content, maxLineLength) {
    if (!content.length) {
        return []
    }
    const segments = findSubsegments(content.slice(), maxLineLength)
    return segments.flat()
}


/**
 * Splits up by double line breaks (ie: paragraph splits), applies some filtering, 
 * then uses word splits to try creating new "lines" up to `maxLineLength`
 * 
 * @param {string} content 
 * @param {number} maxLineLength 
 * @returns {SegmentObject[]}
 */
function findSubsegments(content, maxLineLength) {
    /** @type {SegmentObject[]} */
    const segments = []
    
    const lines = content.split('\n\n').filter(Boolean)
    console.log(lines)
    lines.forEach(line => { 
        /** @type {string[]} */
        let currSeg = []
        let currLen = 0
        // drop single newlines, then split on words
        const subseg = line.replace('\n', ' ').trim().split(/\s+/)
        subseg.forEach(seg => {
            if (currLen > maxLineLength) {
                const prev = currSeg.pop()
                segments.push(serializeSegment(currSeg))
                if (prev) {
                    currSeg = [prev]
                    currLen = prev.length + 1
                } 
            }
            currLen += seg.length + 1
            currSeg.push(seg)
        })
        if (currSeg.length > 0) {
            segments.push(serializeSegment(currSeg))
        }
    })

    return segments
}

/**
 * @param {string[]} seg 
 * @returns {SegmentObject}
 */
function serializeSegment(seg) {
    const text = seg.join(' ')
    return {text, length: text.length}
}