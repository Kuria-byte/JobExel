# JobExel MVP UI Specification

**Design Framework:**  
- **UI Library:** ShadCN UI  
- **Styling:** Tailwind CSS  
- **Typography:** Inter  
- **Color Palette:**  
  - Primary: `#0F172A` (Dark Blue)  
  - Secondary: `#3B82F6` (Bright Blue)  
  - Accent: `#22C55E` (Success Green)  
  - Background: `#FFFFFF`  
  - Text: `#1F2937`  

**General Guidelines:**  
- **Responsive, Mobile-First Design:** Ensure layouts adapt seamlessly across devices.  
- **Accessibility:** Use proper ARIA roles, high contrast colors, and keyboard navigation.  
- **Consistency:** Leverage reusable ShadCN components and a shared design system.  
- **Iterative Approach:** Start with static mockups (using mock data) and then progressively integrate dynamic and backend functionality.

## 1. Home / Landing Page

### **Purpose:**
Introduce JobExel, highlight core features, and drive sign-ups and early engagement.

### **Layout & Components:**

- **Header:**  
  - **Logo:** Positioned on the left.  
  - **Navigation:** Links (Home, Features, About, Contact) and a prominent CTA (Sign In / Sign Up) on the right.  
  - **Responsive Behavior:** Hamburger menu on mobile.

- **Hero Section:**  
  - **Background:** A full-width background image or illustration.  
  - **Headline:** Prominent, clear value proposition (e.g., "Your Career Companion – JobExel").  
  - **Subheadline:** Brief description of key benefits.  
  - **CTA Button:** Primary button (using ShadCN's Button component) labeled "Get Started" or "Sign Up".  
  - **Animation:** Subtle animations or parallax effects can enhance visual appeal.

- **Features Section:**  
  - **Cards/Grid:** Showcase core features (e.g., Resume Builder, Job Search, AI Assistance) using ShadCN Card components.  
  - **Icons & Short Descriptions:** Each feature is represented with an icon and a concise explanation.

- **Testimonials/Social Proof:**  
  - **Carousel or Cards:** Display user testimonials or logos of partner companies.  
  - **Engagement:** Incorporate subtle transitions.

- **Footer:**  
  - **Content:** Links for About, Contact, Social Media, Legal, and Privacy Policy.  
  - **Design:** Clean, minimal layout.

### **Wireframe Sketch:**
```
---------------------------------------------------
| Logo | Home | Features | About | Sign In/Sign Up |
---------------------------------------------------
|        HERO SECTION:                           |
|   [Background Image/Illustration]              |
|   "Your Career Companion – JobExel"            |
|   "Streamline your job search and career growth"|
|   [Primary CTA Button]                         |
---------------------------------------------------
|       FEATURES:                                |
|   [Card]  [Card]  [Card] ...                     |
---------------------------------------------------
|       TESTIMONIALS:                            |
|   [Carousel or Grid of Quotes/Logos]           |
---------------------------------------------------
|       FOOTER:                                  |
|   About | Contact | Social Links | Legal       |
---------------------------------------------------
```

### **Interactions:**
- Smooth scroll transitions.
- Hover states on buttons/cards.
- Clear focus states for accessibility.

## 2. Dashboard

### **Purpose:**
Provide users with an overview of their activities, insights, and quick actions once logged in.

### **Layout & Components:**

- **Sidebar Navigation:**  
  - **Items:** Dashboard overview, Applications, Interviews, Profile, Settings.  
  - **Behavior:** Collapsible sidebar; becomes a hamburger menu on mobile.
  - **Icons & Labels:** Use ShadCN icon components.

- **Header:**  
  - **User Info:** Avatar, name, and notifications icon.  
  - **Search Bar:** Integrated for quick access to content.
  
- **Main Content Area:**  
  - **Widgets/Overview Cards:**  
    - Quick Stats (e.g., number of applications, upcoming interviews)  
    - Activity Feed  
    - AI Insights (job match scores, recommendations)  
  - **Layout:** Grid or flexible card layout using ShadCN Card components.
  
- **Footer (optional):**  
  - Minimal with legal info or quick links.

### **Wireframe Sketch:**
```
-------------------------------
| Sidebar    |  Header       |
| (Nav Links)|  [User Avatar]|
-------------------------------
|        MAIN CONTENT        |
| [Widget Card] [Widget Card]  |
| [Activity Feed]            |
-------------------------------
```

### **Interactions:**
- Collapsible sidebar with smooth transitions.
- Interactive widgets with hover and click effects.
- Responsive reordering on smaller screens.

## 3. Resume Builder

### **Purpose:**
Allow users to create, edit, and preview their resume with a drag-and-drop interface.

### **Layout & Components:**

- **Header:**  
  - **Title & Actions:** Display resume title, with buttons for "Save", "Export", and "Preview".
  
- **Main Editor Area:**  
  - **Two-Column Layout:**  
    - **Left Panel:** Navigation for sections (Personal Info, Experience, Education, Skills).  
    - **Right Panel:** Editable forms for each section.
  - **Drag-and-Drop:** Enable reordering of sections using ShadCN's draggable utilities.
  
- **Sidebar Panel (Optional):**  
  - **Template Selection:** Choose different resume templates.
  
- **Footer:**  
  - **Auto-save Indicator:** Status messages and timestamps.

### **Wireframe Sketch:**
```
---------------------------------------------------
| Header: [Resume Title] [Save] [Export] [Preview]  |
---------------------------------------------------
| Left Panel: Section Navigation  | Right Panel:     |
| - Personal Info                 | Editable Form    |
| - Work Experience               | for Selected     |
| - Education                     | Section          |
| - Skills                        |                  |
---------------------------------------------------
| Footer: Auto-save status info                    |
---------------------------------------------------
```

### **Interactions:**
- Real-time validation on input fields.
- Auto-save with visual feedback.
- Preview modal that shows formatted resume.

## 4. Job Search

### **Purpose:**
Allow users to search for and explore job listings with filtering and detailed views.

### **Layout & Components:**

- **Header/Search Bar:**  
  - **Search Input:** Prominent search box with placeholder text "Search jobs by title, company, or keyword…".  
  - **Filter Options:** Dropdowns or checkboxes for location, job type, and salary range.
  
- **Main Content Area:**  
  - **Job Listing Cards:**  
    - Each card shows job title, company logo, location, brief description, and key details (e.g., employment type).  
    - Use ShadCN Card components for a consistent look.
  
- **Sidebar Filters (Desktop):**  
  - Collapsible filter panel with detailed options.
  
- **Pagination/Infinite Scroll:**  
  - Navigation controls or infinite scroll for seamless browsing.

### **Wireframe Sketch:**
```
---------------------------------------------------
| Header: [Search Bar] [Filters Icon]             |
---------------------------------------------------
| Sidebar (Desktop)  | Job Listings (Grid/List)    |
| - Filters          | [Job Card] [Job Card] ...   |
---------------------------------------------------
| Pagination/Infinite Scroll                      |
---------------------------------------------------
```

### **Interactions:**
- Real-time filtering and search suggestions.
- Clickable job cards that open detailed views (modal or new page).
- Loading states and graceful error messages.

## 5. User Authentication Pages

### **Purpose:**
Provide a clean, user-friendly experience for sign up, sign in, and password management.  
**Inspiration:** Adapt design cues from NextJob.work but implement a unique, streamlined design.

### **Layout & Components:**

#### **Sign In Page:**
- **Centered Card Layout:**  
  - **Header:** Logo and brief welcome message.
  - **Form:** Input fields for email/username and password, with "Remember Me" checkbox.
  - **CTAs:** Primary "Sign In" button, links for "Forgot Password?" and "Sign Up".
  
#### **Sign Up Page:**
- **Similar Centered Layout:**  
  - **Header:** Invitation to join with clear instructions.
  - **Form:** Fields for Name, Email, Password, Confirm Password.
  - **Social Auth Options:** Buttons for LinkedIn, Google, etc.
  - **CTAs:** Primary "Sign Up" button, with a link to "Sign In" for existing users.
  
#### **Password Reset Page:**
- **Simple Form:**  
  - **Input:** Field for email address.
  - **Instruction:** Steps for password recovery.

### **Wireframe Sketch:**
```
---------------------------------------------------
| Centered Card with Logo & Welcome Message       |
---------------------------------------------------
| Form Fields:                                      |
| [Email/Username]                                  |
| [Password]                                      |
| [Remember Me]                                    |
| [Sign In Button]                                 |
| [Forgot Password?] [Sign Up Link]                |
---------------------------------------------------
```

### **Interactions:**
- Smooth form transitions and input focus states.
- Inline validation messages.
- Social auth buttons with hover effects.
- Consistent styling across all auth pages.

# Final Considerations

- **Consistency Across Pages:**  
  Ensure that the header, footer, and common components share the same design language and interactions.

- **Responsiveness & Accessibility:**  
  Use ShadCN's components with Tailwind utilities to enforce responsive breakpoints and accessibility features (ARIA labels, semantic HTML).

- **Prototyping & Testing:**  
  Start with high-fidelity prototypes in Figma or similar tools. Validate with users, then implement in code using the outlined layouts.

- **Iterative Enhancements:**  
  As you progress from static UI to dynamic backend integration, update your components to handle loading states, errors, and real data. Leverage AI tools to help generate and refactor code where necessary. 