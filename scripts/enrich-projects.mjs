import { projects } from '../src/data/projects.mjs';
import { writeFile } from 'node:fs/promises';

const enrichments = {
  'employee-app': {
    title: 'Employee App',
    subtitle: 'Concept testing a more useful employee mobile experience',
    cardSummary: 'A mobile employee-app concept exploring how communications, tasks, services and daily utility can work together in one coherent experience.',
    overview: 'This case study turns the EmployeeApp Figma file into a complete portfolio story about testing a broader employee mobile experience. The source material is a mid-fidelity concept board rather than a shipped-product evidence pack, so the page focuses on the design problem, product framing, concept decisions and what would need to be validated next.',
    brief: {
      title: 'The brief',
      body: 'Explore whether an enterprise employee app could become more than a communications feed. The concept needed to test a super-app direction: one mobile destination where employees can understand what is happening, complete common tasks and reach the services they need without jumping across disconnected tools.',
      bullets: [
        'Define a stronger mobile information architecture for a broad employee experience.',
        'Make high-frequency employee needs easier to reach from the app home screen.',
        'Use mid-fidelity screens to test comprehension before committing to detailed visual design.',
        'Create a structure that could scale across communications, services, tasks and support moments.'
      ]
    },
    roleContribution: {
      title: 'My contribution',
      body: 'I treated the Figma board as a concept-testing artefact and shaped the case study around the product questions it raises. The work sits at the intersection of IA, mobile UX and enterprise product strategy: deciding what should be prominent, what should be secondary, and how a broad employee app can avoid becoming an overloaded menu.',
      bullets: [
        'Framed the problem around fragmentation in employee-facing mobile experiences.',
        'Explored app structure, home-screen hierarchy and feature entry points.',
        'Kept the design at mid fidelity to support faster critique and concept validation.',
        'Prepared the case-study structure for future research notes, stakeholder decisions and product metrics.'
      ]
    },
    decisions: [
      { title: 'Prioritise daily jobs over feature inventory', body: 'A super app can quickly become a dumping ground. The proposed structure gives priority to the tasks and updates employees are most likely to need frequently, while leaving lower-frequency services available but less dominant.' },
      { title: 'Use navigation to communicate the product model', body: 'The navigation is not just a wayfinding device. It explains the mental model of the app: updates, actions, services and personal context need to feel intentionally grouped rather than stitched together.' },
      { title: 'Test structure before visual polish', body: 'The mid-fidelity approach makes it easier to challenge labels, order, grouping and comprehension before colour, imagery and motion make the concept feel more finished than it is.' }
    ],
    accessibilityNotes: [
      'Mobile navigation should remain operable with large touch targets and predictable tab order.',
      'Information cards should not rely on colour alone to show priority or status.',
      'Critical tasks should use plain-language labels rather than internal product terminology.',
      'The experience should support dynamic text sizing and avoid truncating essential task labels.'
    ],
    outcomes: [
      'Reframed the Employee App project as a concept-testing case study instead of a placeholder page.',
      'Clarified the product opportunity: a more connected employee mobile experience that brings communications and utility together.',
      'Documented the key design questions that need validation before progressing to high-fidelity design or delivery.',
      'Created a reusable evidence-ready structure for adding research findings, stakeholder feedback and implementation outcomes later.'
    ]
  },
  events: {
    subtitle: 'Designing clearer event creation, scheduling and management workflows',
    cardSummary: 'A case study for helping enterprise communicators create, preview, schedule and manage employee events with fewer setup mistakes.',
    overview: 'This case study uses the Events Figma file as the source for a fuller product-design story. The file includes event proposal material, creation screens, event details, list views, calendar views and supporting interface states. The page now explains the design problem, the workflow decisions and the product rationale behind those artefacts.',
    brief: {
      title: 'The brief',
      body: 'Create an events experience for enterprise communicators who need to set up employee-facing events with confidence. The workflow has to capture practical details such as date, time, location, description, media and audience, while also helping teams review what employees will see before an event is published or promoted.',
      bullets: [
        'Reduce uncertainty while creating event details, scheduling information and attendee-facing content.',
        'Support both list-based management and calendar-based planning.',
        'Make preview and review states visible before publication.',
        'Use familiar enterprise patterns so the workflow feels predictable inside a broader platform.'
      ]
    },
    roleContribution: {
      title: 'My contribution',
      body: 'The work focuses on turning a complex operational task into a sequence that feels manageable. I framed the flow around what communicators need to know at each stage: what information is required, what can be added later, what employees will see, and how scheduled events can be monitored after creation.',
      bullets: [
        'Structured the create-event flow around required details, supporting content and review confidence.',
        'Designed management surfaces for scanning existing events, dates, statuses and metadata.',
        'Used preview-style screens to connect back-office setup with attendee-facing output.',
        'Maintained consistency with enterprise SaaS patterns such as tables, forms, filters and detail pages.'
      ]
    },
    decisions: [
      { title: 'Separate setup from review', body: 'Event creation asks users to enter a lot of information. A clear separation between input fields and preview/review moments helps prevent errors and supports confidence before publishing.' },
      { title: 'Support multiple planning modes', body: 'A table helps users scan metadata and status; a calendar helps them understand timing and overlap. Both views support different planning behaviours and should not compete with each other.' },
      { title: 'Make the employee-facing output tangible', body: 'The event detail concept gives communicators a concrete view of how the event will be understood by employees, including title, imagery, description and attendance actions.' },
      { title: 'Keep controls close to context', body: 'Actions such as editing, publishing or reviewing should sit near the relevant event state rather than forcing users to hunt through global controls.' }
    ],
    accessibilityNotes: [
      'Form fields need persistent labels, clear helper text and accessible error messaging.',
      'Calendar information should also be available in list form for screen-reader and keyboard users.',
      'Status labels should use text as well as colour.',
      'Preview content should preserve heading order and meaningful action labels.'
    ],
    outcomes: [
      'Replaced the placeholder Event Builder page with a complete Events case study based on the supplied Figma file.',
      'Explained the core product problem: helping communicators create accurate, employee-facing event experiences.',
      'Documented the main UX decisions across creation, review, scheduling, list management and calendar planning.',
      'Added accessible, optimised visuals from the Figma source without exposing the raw design file publicly.'
    ]
  },
  workflows: {
    subtitle: 'Making automation journeys easier to build, understand and trust',
    cardSummary: 'A case study for workflow automation UX, covering canvas structure, message sequencing, logic review and operational monitoring.',
    overview: 'This case study turns the Workflows Figma file into a fuller narrative about designing automation tools for enterprise communications. The source includes workflow builder concepts, journey examples, message previews, logic diagrams and dashboard surfaces. The case study now focuses on the central UX challenge: helping users understand what an automated journey will do before it affects a real audience.',
    brief: {
      title: 'The brief',
      body: 'Design a workflow-building experience for communication journeys where authors can combine triggers, messages, waits, checkpoints and branching logic. The product needed to make automation feel understandable and governed, not like a hidden set of rules buried in configuration screens.',
      bullets: [
        'Represent workflow logic in a way that can be scanned quickly.',
        'Help authors configure individual steps without losing sight of the whole journey.',
        'Provide preview and review states before activation.',
        'Support operational monitoring once workflows are live or scheduled.'
      ]
    },
    roleContribution: {
      title: 'My contribution',
      body: 'I framed the work around trust in automation. The design challenge was not only arranging cards on a canvas; it was making sure users could predict the consequences of their choices, review audience impact and understand the journey after it was created.',
      bullets: [
        'Explored a canvas-led model for building and scanning communication journeys.',
        'Structured workflow steps around triggers, messages, waits, checkpoints and branching decisions.',
        'Connected builder states with preview and dashboard concepts to support governance.',
        'Prepared the project page for future validation evidence, delivery notes and measurable outcomes.'
      ]
    },
    decisions: [
      { title: 'Keep the whole journey visible', body: 'Workflow tools fail when users have to remember logic hidden inside panels. The canvas gives authors a visible map of the sequence while still allowing detailed configuration.' },
      { title: 'Treat preview as a safety feature', body: 'Preview is not a cosmetic add-on. For automation, it helps users check what messages will be sent, when they will be sent and which conditions affect the audience journey.' },
      { title: 'Represent waits and checkpoints explicitly', body: 'Time-based logic is a common source of misunderstanding. Wait steps and coverage checkpoints need to be visible, labelled and easy to inspect.' },
      { title: 'Design for after launch', body: 'Workflow UX does not end at activation. Dashboard and status surfaces help teams monitor performance, diagnose issues and understand what is currently live.' }
    ],
    accessibilityNotes: [
      'Canvas interactions should have keyboard-operable alternatives and structured step lists.',
      'Workflow status should be exposed with text labels, not colour alone.',
      'Configuration panels should use semantic form controls with clear validation messages.',
      'Zoomable or complex diagrams should include a readable linear summary of the workflow sequence.'
    ],
    outcomes: [
      'Replaced the placeholder Workflow Builder page with a complete Workflows case study based on the supplied Figma file.',
      'Clarified the product contribution: making automation logic visible, reviewable and safer to activate.',
      'Documented the design decisions behind canvas structure, preview states, wait logic and operational monitoring.',
      'Added optimised Figma-derived visuals while keeping the case study honest about missing validation metrics.'
    ]
  }
};

const updated = projects.map((p) => ({ ...p, ...(enrichments[p.slug] || {}) }));
await writeFile(new URL('../src/data/projects.mjs', import.meta.url), `export const projects = ${JSON.stringify(updated, null, 2)};\n`);
