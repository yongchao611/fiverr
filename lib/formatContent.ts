/**
 * Format article content - converts plain text to HTML if needed
 */
export function formatArticleContent(content: string): string {
  if (!content) return ''
  
  // Check if content already has HTML tags
  const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(content)
  
  if (hasHtmlTags) {
    // Content already has HTML, return as is
    return content
  }
  
  // Content is plain text, convert to HTML
  // Split by double line breaks for paragraphs
  const paragraphs = content.split(/\n\s*\n/)
  
  const formatted = paragraphs
    .map(para => {
      // Trim whitespace
      para = para.trim()
      if (!para) return ''
      
      // Replace single line breaks with <br>
      para = para.replace(/\n/g, '<br>')
      
      // Wrap in paragraph tag
      return `<p>${para}</p>`
    })
    .filter(para => para !== '')
    .join('\n\n')
  
  return formatted
}

/**
 * Auto-format plain text with better paragraph detection
 */
export function autoFormatContent(content: string): string {
  if (!content) return ''
  
  // Check if already has HTML
  const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(content)
  if (hasHtmlTags) return content
  
  // Split into lines
  const lines = content.split('\n')
  let result = ''
  let currentParagraph = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Empty line - end current paragraph
    if (line === '') {
      if (currentParagraph) {
        result += `<p>${currentParagraph}</p>\n\n`
        currentParagraph = ''
      }
      continue
    }
    
    // Add line to current paragraph
    if (currentParagraph) {
      currentParagraph += '<br>' + line
    } else {
      currentParagraph = line
    }
  }
  
  // Don't forget the last paragraph
  if (currentParagraph) {
    result += `<p>${currentParagraph}</p>`
  }
  
  return result
}


