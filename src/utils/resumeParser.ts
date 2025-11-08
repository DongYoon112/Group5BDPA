import type { Skill } from '../types';

/**
 * Extract text from a PDF file
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');
  
  // Set worker source - use CDN for compatibility
  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }
  
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
}

/**
 * Extract text from a DOCX file
 */
export async function extractTextFromDOCX(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/**
 * Extract text from a TXT file
 */
export async function extractTextFromTXT(file: File): Promise<string> {
  return await file.text();
}

/**
 * Extract skills from resume text by matching against the skills database
 */
export function extractSkillsFromText(text: string, skills: Skill[]): string[] {
  const extractedSkills: string[] = [];
  const seen = new Set<string>();
  
  // Create a map of all possible skill matches (label, aliases, id)
  const skillMatches: Array<{ pattern: string; skillId: string }> = [];
  
  for (const skill of skills) {
    // Add skill label
    skillMatches.push({
      pattern: skill.label.toLowerCase(),
      skillId: skill.id
    });
    
    // Add skill ID
    if (skill.id.toLowerCase() !== skill.label.toLowerCase()) {
      skillMatches.push({
        pattern: skill.id.toLowerCase(),
        skillId: skill.id
      });
    }
    
    // Add aliases
    for (const alias of skill.aliases) {
      skillMatches.push({
        pattern: alias.toLowerCase(),
        skillId: skill.id
      });
    }
  }
  
  // Sort by length (longest first) to match "JavaScript" before "Java"
  skillMatches.sort((a, b) => b.pattern.length - a.pattern.length);
  
  // Find matches using word boundaries
  for (const { pattern, skillId } of skillMatches) {
    // Use word boundary regex to match whole words only
    const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    if (regex.test(text) && !seen.has(skillId)) {
      extractedSkills.push(skillId);
      seen.add(skillId);
    }
  }
  
  return extractedSkills;
}

/**
 * Parse a resume file and extract skills
 */
export async function parseResume(file: File, skills: Skill[]): Promise<string[]> {
  let text = '';
  
  try {
    if (file.type === 'application/pdf') {
      text = await extractTextFromPDF(file);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      text = await extractTextFromDOCX(file);
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      text = await extractTextFromTXT(file);
    } else {
      throw new Error('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
    }
    
    return extractSkillsFromText(text, skills);
  } catch (error) {
    throw new Error(`Failed to parse resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

