# Resume Parsing Implementation Guide

## Overview
This document outlines the implementation strategy for parsing resumes in JobExel, using AI and traditional parsing methods to extract structured data from various resume formats.

## Data Structure

### Resume Data Model
```typescript
interface ParsedResume {
  personal_info: {
    full_name: string;
    email: string;
    phone?: string;
    location?: {
      city?: string;
      country?: string;
      full_address?: string;
    };
    linkedin_url?: string;
    portfolio_url?: string;
  };
  
  professional_summary?: string;
  
  work_experience: {
    company: string;
    position: string;
    location?: string;
    start_date: Date;
    end_date?: Date;
    is_current?: boolean;
    description: string;
    achievements: string[];
    technologies?: string[];
  }[];
  
  education: {
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: Date;
    end_date?: Date;
    gpa?: number;
    achievements?: string[];
  }[];
  
  skills: {
    technical: string[];
    soft: string[];
    languages: {
      name: string;
      proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
    }[];
  };
  
  certifications?: {
    name: string;
    issuer: string;
    date_obtained: Date;
    expiry_date?: Date;
    credential_id?: string;
  }[];
  
  metadata: {
    parsing_date: Date;
    original_file: {
      name: string;
      format: 'PDF' | 'DOCX' | 'TXT';
      size: number;
      hash: string;
    };
    confidence_score: number;
  };
}
```

## Implementation

### 1. File Processing Service
```typescript
// src/lib/services/resume/processor.ts
export class ResumeProcessor {
  private readonly SUPPORTED_FORMATS = ['pdf', 'docx', 'txt'];
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  async processResume(file: File): Promise<ProcessedFile> {
    this.validateFile(file);
    
    const buffer = await file.arrayBuffer();
    const text = await this.extractText(buffer, file.type);
    
    return {
      text,
      metadata: {
        filename: file.name,
        format: this.getFileFormat(file.type),
        size: file.size,
        hash: await this.generateHash(buffer)
      }
    };
  }

  private async extractText(buffer: ArrayBuffer, mimeType: string): Promise<string> {
    switch(mimeType) {
      case 'application/pdf':
        return this.extractFromPDF(buffer);
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return this.extractFromDOCX(buffer);
      case 'text/plain':
        return this.extractFromTXT(buffer);
      default:
        throw new Error(`Unsupported file format: ${mimeType}`);
    }
  }
}
```

### 2. AI-Powered Parser
```typescript
// src/lib/services/resume/aiParser.ts
export class AIResumeParser {
  private readonly openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async parseResume(text: string): Promise<ParsedResume> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Parse the following resume text into structured data. 
                    Extract key information including personal details, 
                    work experience, education, skills, and certifications.
                    Format the response as JSON matching the ParsedResume interface.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedData = JSON.parse(response.choices[0].message.content);
    return this.validateAndCleanParsedData(parsedData);
  }

  private validateAndCleanParsedData(data: any): ParsedResume {
    // Implement validation and cleaning logic
    return data as ParsedResume;
  }
}
```

### 3. Skills Extraction and Categorization
```typescript
// src/lib/services/resume/skillsExtractor.ts
export class SkillsExtractor {
  private readonly technicalSkillsKeywords: Set<string>;
  private readonly softSkillsKeywords: Set<string>;

  constructor() {
    this.loadSkillsKeywords();
  }

  async extractSkills(text: string): Promise<Skills> {
    const technical = await this.extractTechnicalSkills(text);
    const soft = await this.extractSoftSkills(text);
    const languages = await this.extractLanguages(text);

    return {
      technical,
      soft,
      languages
    };
  }

  private async extractTechnicalSkills(text: string): Promise<string[]> {
    // Implement technical skills extraction logic
    // Use combination of keyword matching and AI analysis
  }
}
```

### 4. Experience Analysis
```typescript
// src/lib/services/resume/experienceAnalyzer.ts
export class ExperienceAnalyzer {
  async analyzeExperience(experiences: WorkExperience[]): Promise<ExperienceAnalysis> {
    return {
      total_years: this.calculateTotalYears(experiences),
      skills_timeline: await this.generateSkillsTimeline(experiences),
      career_progression: this.analyzeTitleProgression(experiences),
      industry_exposure: await this.analyzeIndustries(experiences)
    };
  }

  private calculateTotalYears(experiences: WorkExperience[]): number {
    // Calculate total years of experience
  }
}
```

### 5. Resume Scoring and Matching
```typescript
// src/lib/services/resume/matcher.ts
export class ResumeJobMatcher {
  async matchResumeToJob(
    resume: ParsedResume,
    jobDescription: string
  ): Promise<MatchResult> {
    const skillsMatch = await this.analyzeSkillsMatch(resume.skills, jobDescription);
    const experienceMatch = await this.analyzeExperienceMatch(
      resume.work_experience,
      jobDescription
    );
    const educationMatch = this.analyzeEducationMatch(
      resume.education,
      jobDescription
    );

    return {
      overall_score: this.calculateOverallScore(
        skillsMatch,
        experienceMatch,
        educationMatch
      ),
      skill_gaps: skillsMatch.missing_skills,
      recommendations: await this.generateRecommendations(
        skillsMatch,
        experienceMatch,
        educationMatch
      )
    };
  }
}
```

## Integration Points

### 1. File Upload Component
```typescript
// src/components/resume/Upload.tsx
export function ResumeUpload() {
  const handleFileUpload = async (file: File) => {
    try {
      const processor = new ResumeProcessor();
      const processed = await processor.processResume(file);
      
      const parser = new AIResumeParser();
      const parsed = await parser.parseResume(processed.text);
      
      // Handle parsed resume data
    } catch (error) {
      // Handle error
    }
  };

  return (
    <DropZone
      accept=".pdf,.docx,.txt"
      maxSize={10 * 1024 * 1024}
      onDrop={handleFileUpload}
    />
  );
}
```

### 2. Resume Preview Component
```typescript
// src/components/resume/Preview.tsx
export function ResumePreview({ parsedResume }: { parsedResume: ParsedResume }) {
  return (
    <div className="resume-preview">
      <PersonalInfo info={parsedResume.personal_info} />
      <ExperienceTimeline experiences={parsedResume.work_experience} />
      <SkillsCloud skills={parsedResume.skills} />
      <EducationSection education={parsedResume.education} />
    </div>
  );
}
```

## Error Handling

### 1. Validation Errors
```typescript
enum ResumeParsingError {
  INVALID_FILE_FORMAT = 'INVALID_FILE_FORMAT',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  PARSING_FAILED = 'PARSING_FAILED',
  MISSING_REQUIRED_DATA = 'MISSING_REQUIRED_DATA',
  AI_SERVICE_ERROR = 'AI_SERVICE_ERROR'
}
```

### 2. Error Recovery
```typescript
async function handleParsingError(error: ResumeParsingError, file: File) {
  switch (error) {
    case ResumeParsingError.INVALID_FILE_FORMAT:
      // Suggest supported formats
      break;
    case ResumeParsingError.PARSING_FAILED:
      // Attempt alternative parsing method
      break;
    // Handle other error cases
  }
}
```

## Best Practices

1. **Privacy & Security**
   - Implement secure file handling
   - Remove sensitive personal information
   - Comply with data protection regulations

2. **Performance**
   - Implement file size limits
   - Use background processing for large files
   - Cache parsing results

3. **Accuracy**
   - Validate parsed data
   - Use multiple parsing methods
   - Implement confidence scores

4. **User Experience**
   - Provide real-time feedback
   - Allow manual corrections
   - Save parsing history

5. **Maintenance**
   - Regular updates to skills database
   - Monitor parsing accuracy
   - Update AI models as needed 