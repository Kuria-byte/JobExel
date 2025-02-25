# WeWorkRemotely Job Scraping Implementation Guide

## Overview
This document outlines the implementation strategy for scraping job listings from WeWorkRemotely (WWR) and integrating them into the JobExel platform.

## Data Structure Analysis

### Job Listing Structure
```typescript
interface WWRJobListing {
  title: string;                 // "Senior Backend Developer SaaS"
  company: {
    name: string;               // "CData Virtuality"
    location: string;           // "Leipzig"
    logo?: string;             // Company logo URL
  };
  status: {
    featured: boolean;         // Featured job indicator
    new: boolean;             // New job indicator
    top100: boolean;          // Top 100 company indicator
  };
  employment: {
    type: 'Full-Time' | 'Contract';
    location_type: 'remote' | 'onsite' | 'hybrid';
    restrictions: string[];    // ["USA Only", "Europe Only", etc.]
  };
  compensation: {
    range?: {
      min: number;
      max: number;
      currency: string;
    };
    display: string;          // "$100,000 or more USD"
  };
  posted_date: Date;          // Calculated from "6d" ago format
  category: string;           // "Back-End Programming", "Design", etc.
}
```

## Implementation

### 1. Scraping Service
```typescript
// src/lib/scrapers/weworkremotely/index.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import { parseJobDetails } from './parser';

export class WWRScraper {
  private readonly BASE_URL = 'https://weworkremotely.com';
  private readonly CATEGORIES = [
    'programming',
    'design',
    'devops-and-sysadmin',
    'product',
    'sales-and-marketing',
    // ... other categories
  ];

  async scrapeAllJobs(): Promise<WWRJobListing[]> {
    const jobs: WWRJobListing[] = [];
    
    for (const category of this.CATEGORIES) {
      try {
        const categoryJobs = await this.scrapeCategory(category);
        jobs.push(...categoryJobs);
      } catch (error) {
        console.error(`Error scraping category ${category}:`, error);
      }
    }

    return jobs;
  }

  private async scrapeCategory(category: string): Promise<WWRJobListing[]> {
    const url = `${this.BASE_URL}/categories/${category}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    return this.parseJobListings($);
  }

  private parseJobListings($: CheerioStatic): WWRJobListing[] {
    const jobs: WWRJobListing[] = [];
    
    $('article.job-listing').each((_, element) => {
      const job = this.parseJobListing($, element);
      if (job) jobs.push(job);
    });

    return jobs;
  }
}
```

### 2. Job Parser
```typescript
// src/lib/scrapers/weworkremotely/parser.ts
export function parseJobListing($: CheerioStatic, element: CheerioElement): WWRJobListing | null {
  try {
    const $element = $(element);
    
    return {
      title: $element.find('.title').text().trim(),
      company: {
        name: $element.find('.company').text().trim(),
        location: $element.find('.location').text().trim(),
        logo: $element.find('.company-logo').attr('src')
      },
      status: {
        featured: $element.hasClass('featured'),
        new: $element.find('.new').length > 0,
        top100: $element.find('.top-100').length > 0
      },
      employment: parseEmploymentDetails($element),
      compensation: parseCompensation($element),
      posted_date: parseDateAgo($element.find('.date').text()),
      category: $element.closest('section').find('h2').text()
    };
  } catch (error) {
    console.error('Error parsing job listing:', error);
    return null;
  }
}
```

### 3. Data Transformation
```typescript
// src/lib/scrapers/weworkremotely/transformer.ts
export function transformToJobExelFormat(wwrJob: WWRJobListing): Job {
  return {
    id: generateUniqueId(),
    source: {
      name: 'WeWorkRemotely',
      external_id: wwrJob.id,
      url: wwrJob.url
    },
    title: wwrJob.title,
    company: {
      name: wwrJob.company.name,
      logo: wwrJob.company.logo,
      location: wwrJob.company.location
    },
    employment_type: wwrJob.employment.type,
    location: {
      type: wwrJob.employment.location_type,
      restrictions: wwrJob.employment.restrictions
    },
    salary: transformSalary(wwrJob.compensation),
    posted_date: wwrJob.posted_date,
    status: 'active',
    category: mapCategory(wwrJob.category)
  };
}
```

### 4. Rate Limiting and Caching
```typescript
// src/lib/scrapers/weworkremotely/rateLimiter.ts
export class WWRRateLimiter {
  private readonly REQUESTS_PER_MINUTE = 10;
  private requestTimes: number[] = [];

  async waitForSlot(): Promise<void> {
    const now = Date.now();
    this.requestTimes = this.requestTimes.filter(time => 
      time > now - 60000
    );

    if (this.requestTimes.length >= this.REQUESTS_PER_MINUTE) {
      const oldestRequest = this.requestTimes[0];
      const waitTime = 60000 - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.requestTimes.push(now);
  }
}
```

### 5. Job Sync Service
```typescript
// src/lib/services/jobSync.ts
export class JobSyncService {
  private readonly scraper: WWRScraper;
  private readonly rateLimiter: WWRRateLimiter;

  constructor() {
    this.scraper = new WWRScraper();
    this.rateLimiter = new WWRRateLimiter();
  }

  async syncJobs(): Promise<void> {
    const jobs = await this.scraper.scrapeAllJobs();
    const transformedJobs = jobs.map(transformToJobExelFormat);
    
    await this.saveJobs(transformedJobs);
  }

  private async saveJobs(jobs: Job[]): Promise<void> {
    // Batch process jobs
    for (const batch of chunk(jobs, 100)) {
      await this.processBatch(batch);
    }
  }
}
```

## Error Handling and Monitoring

### 1. Error Types
```typescript
enum ScrapingErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  PARSING_ERROR = 'PARSING_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  TRANSFORMATION_ERROR = 'TRANSFORMATION_ERROR'
}
```

### 2. Monitoring
```typescript
// src/lib/monitoring/scraping.ts
export class ScrapingMonitor {
  logScrapingMetrics(metrics: {
    totalJobs: number;
    successfulJobs: number;
    failedJobs: number;
    duration: number;
  }): void {
    // Log metrics to monitoring system
  }
}
```

## Usage Example
```typescript
// src/scripts/syncJobs.ts
async function syncWWRJobs() {
  const syncService = new JobSyncService();
  const monitor = new ScrapingMonitor();

  try {
    console.log('Starting WWR job sync...');
    const startTime = Date.now();

    await syncService.syncJobs();

    const duration = Date.now() - startTime;
    monitor.logScrapingMetrics({
      totalJobs: jobs.length,
      successfulJobs: successful,
      failedJobs: failed,
      duration
    });

  } catch (error) {
    console.error('Job sync failed:', error);
  }
}
```

## Best Practices

1. **Rate Limiting**
   - Respect WWR's rate limits
   - Implement exponential backoff for failures
   - Cache responses when possible

2. **Data Quality**
   - Validate all scraped data
   - Handle missing or malformed data gracefully
   - Maintain data consistency with JobExel schema

3. **Error Handling**
   - Log all errors with context
   - Implement retry mechanisms
   - Monitor scraping health

4. **Performance**
   - Use batch processing for database operations
   - Implement incremental updates
   - Cache frequently accessed data

5. **Compliance**
   - Follow robots.txt guidelines
   - Include user-agent identification
   - Maintain ethical scraping practices 