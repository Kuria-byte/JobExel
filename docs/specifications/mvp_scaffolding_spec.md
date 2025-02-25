# JobExel MVP Scaffolding Specification

## Objective
Create a production-ready Next.js 14 application using shadcn/ui that implements core job search functionality with AI enhancements. Prioritize modular architecture and TypeScript safety.

## Tech Stack Requirements
- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui + Radix primitives
- **Language**: TypeScript 5.x
- **AI**: OpenAI API (v4 SDK)
- **Database**: Drizzle ORM + PostgreSQL
- **Auth**: NextAuth
- **State**: SWR/TanStack Query

## Project Structure
```plaintext
/src
  /app
    /dashboard
      layout.tsx
      /jobs
      /resume-builder
      /ai-tools
    /onboarding
  /components
    /ai
    /jobs
    /data-table
  /lib
    /openai
    /parsers
  /types
```

## Core Features Implementation

### 1. User Onboarding Flow
```tsx
// Example OnboardingForm component
<Card>
  <CardHeader>
    <CardTitle>Career Setup</CardTitle>
  </CardHeader>
  <CardContent>
    <Tabs defaultValue="import">
      <TabsList>
        <TabsTrigger value="import">Import LinkedIn</TabsTrigger>
        <TabsTrigger value="upload">Upload Resume</TabsTrigger>
      </TabsList>
      <TabsContent value="import">{/* OAuth flow */}</TabsContent>
      <TabsContent value="upload">
        <FileUploader
          accept=".pdf,.docx"
          onUpload={parseResume}
        />
      </TabsContent>
    </Tabs>
  </CardContent>
</Card>
```

### 2. AI-Powered Job Matching
```ts
// app/api/job-match/route.ts
export async function POST(req: Request) {
  const { resumeText, jobDescription } = await req.json();
  const analysis = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{
      role: "system",
      content: `Analyze match between resume and job requirements. 
                Output JSON with score and improvement areas.`
    }]
  });
  return NextResponse.json(JSON.parse(analysis.choices[0].message.content));
}
```

### 3. Dynamic Job Board
- Filterable data table with shadcn `DataTable`
- Debounced search implementation
- Resume version selector in application flow

## UI Requirements
- 🎨 Use shadcn's `CommandMenu` for global search
- 🌓 Dark/light mode with CSS variables
- 📱 Mobile-first responsive design
- ⏳ Loading states with `Skeleton` components

## AI Integration Points
1. Resume-JD match percentage indicator
2. Interview question generator
3. Salary negotiation simulator
4. Application status predictor

## Coding Guidelines
```ts
// Example type-safe API response
const JobMatchSchema = z.object({
  score: z.number().min(0).max(100),
  improvements: z.array(z.string())
});

type JobMatch = z.infer<typeof JobMatchSchema>;
```

## Error Handling Strategy
```tsx
// Unified error boundary
<ErrorBoundary 
  fallback={<Alert variant="destructive">Analysis failed</Alert>}
>
  <AIMatchComponent />
</ErrorBoundary>
```

## Next Steps
1. Generate project setup commands
2. Implement NextAuth authentication flow
3. Build resume/job matcher component
4. Scaffold shared UI components

---

**Special Considerations**  
- Apply brand colors to shadcn theme config
- Add JSDoc annotations for AI understanding
- Implement API rate limiting
- Configure edge runtime for AI features 