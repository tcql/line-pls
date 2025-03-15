// place files you want to import through the `$lib` alias in this folder.

/**
 * @typedef {object} SegmentObject
 * @property {string[]} segments
 * @property {number} segmentIndex
 */

/**
 * Given string content, a current character position, and the max line length,
 * tries to break into "lines" that split cleanly on words.
 * 
 * @param {string} content 
 * @param {number} currentPosition 
 * @param {number} maxLineLength 
 * @returns {SegmentObject}
 */
export function getSegments(content, currentPosition, maxLineLength) {
    if (!content.length) {
        return {segments: [], segmentIndex: 0}
    }
    const before = content.slice(0, currentPosition)
    const after = content.slice(currentPosition)

    const {segments} = getSegments(before, Math.max(currentPosition - maxLineLength, 0), maxLineLength)
    const segmentIndex = segments.length

    const afterSegments = findSubsegments(after, maxLineLength)
    return {
        segments: segments.concat(afterSegments),
        segmentIndex
    }
}


/**
 * 
 * @param {string} content 
 * @param {number} maxLineLength 
 * @returns {string[]}
 */
function findSubsegments(content, maxLineLength) {
    const segments = []
    /** @type string[] */
    let currSeg = []

    const subseg = content.split(' ')
    subseg.forEach(seg => { 
        if (currSeg.join(' ').length > maxLineLength) {
            let prev = currSeg.pop()
            segments.push(currSeg.join(' '))
            currSeg = [prev]
        }
        currSeg.push(seg)
    })
    if (currSeg.length > 0) {
        segments.push(currSeg.join(' '))
    }
    return segments
}

/**
 * 
 * @param {string} content 
 * @param {number} maxLineLength 
 * @returns {string[]}
 */
function findSubsegments2(content, maxLineLength) {
    // const sentences = 
    return []
}