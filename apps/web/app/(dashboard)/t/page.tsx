"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TemplateCard } from "~/components/ui/template-card";
import { useCreateForm } from "~/hooks/use-form";
import { AiGenerateFormDialog } from "~/components/ai-generate-form-dialog";

export const MOCK_TEMPLATES = [
  {
    title: "Customer Feedback Form",
    description: "Collect comprehensive customer feedback after service delivery.",
    slug: "customer-feedback",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Full Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "John Doe",
      },
      {
        label: "Email Address",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "john@example.com",
      },
      {
        label: "Service Received",
        type: "select" as const,
        required: true,
        index: 2,
        options: ["Web Platform", "Mobile App", "Customer Support", "Consulting Services"],
      },
      { label: "Overall Satisfaction Rating", type: "rating" as const, required: true, index: 3 },
      {
        label: "What did you like most about your experience?",
        type: "textarea" as const,
        required: false,
        index: 4,
      },
      { label: "Areas for Improvement", type: "textarea" as const, required: false, index: 5 },
      {
        label: "Would you recommend us to a friend or colleague?",
        type: "select" as const,
        required: true,
        index: 6,
        options: ["Definitely", "Probably", "Not Sure", "Unlikely"],
      },
    ],
  },
  {
    title: "Job Application",
    description: "Screen candidates with detailed applicant information and qualifications.",
    slug: "job-application",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Full Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Jane Smith",
      },
      {
        label: "Email Address",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "jane.smith@example.com",
      },
      {
        label: "Phone Number",
        type: "text" as const,
        required: true,
        index: 2,
        placeholder: "+1 (555) 019-2834",
      },
      {
        label: "Position Applied For",
        type: "select" as const,
        required: true,
        index: 3,
        options: [
          "Software Engineer",
          "Product Manager",
          "UI/UX Designer",
          "Marketing Specialist",
          "Sales Representative",
        ],
      },
      {
        label: "Portfolio / LinkedIn Profile",
        type: "text" as const,
        required: false,
        index: 4,
        placeholder: "https://linkedin.com/in/janesmith",
      },
      {
        label: "Expected Salary Range",
        type: "text" as const,
        required: false,
        index: 5,
        placeholder: "$80,000 - $100,000",
      },
      { label: "Earliest Available Start Date", type: "date" as const, required: true, index: 6 },
      {
        label: "Cover Letter / Why do you want to join us?",
        type: "textarea" as const,
        required: true,
        index: 7,
      },
    ],
  },
  {
    title: "Event Registration",
    description: "Register attendees for conferences, workshops, or webinars.",
    slug: "event-registration",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Full Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Alex Rivera",
      },
      {
        label: "Email Address",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "alex@company.com",
      },
      {
        label: "Company / Organization",
        type: "text" as const,
        required: false,
        index: 2,
        placeholder: "Acme Corp",
      },
      {
        label: "Job Title",
        type: "text" as const,
        required: false,
        index: 3,
        placeholder: "Senior Developer",
      },
      {
        label: "Ticket Category",
        type: "select" as const,
        required: true,
        index: 4,
        options: ["General Admission", "VIP All-Access", "Virtual Pass", "Student / Non-Profit"],
      },
      {
        label: "Dietary Restrictions",
        type: "select" as const,
        required: false,
        index: 5,
        options: ["None", "Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher"],
      },
      {
        label: "Will you attend the networking dinner?",
        type: "select" as const,
        required: true,
        index: 6,
        options: ["Yes", "No", "Undecided"],
      },
      {
        label: "Special Accommodations or Requests",
        type: "textarea" as const,
        required: false,
        index: 7,
      },
    ],
  },
  {
    title: "Course Enrollment",
    description: "Enroll students and collect educational background details.",
    slug: "course-enrollment",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Student Full Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Taylor Reed",
      },
      {
        label: "Email Address",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "taylor@example.com",
      },
      {
        label: "Phone Number",
        type: "text" as const,
        required: false,
        index: 2,
        placeholder: "+1 (555) 014-9922",
      },
      {
        label: "Target Course",
        type: "select" as const,
        required: true,
        index: 3,
        options: [
          "Full-Stack Web Development",
          "Data Science & Machine Learning",
          "UI/UX & Product Design",
          "Cloud & DevOps Engineering",
        ],
      },
      {
        label: "Preferred Schedule",
        type: "select" as const,
        required: true,
        index: 4,
        options: ["Weekday Evenings", "Weekend Mornings", "Self-Paced Online"],
      },
      {
        label: "Prior Experience Level",
        type: "select" as const,
        required: true,
        index: 5,
        options: ["None (Complete Beginner)", "Basic Knowledge", "Intermediate", "Advanced"],
      },
      {
        label: "Learning Goals & Expectations",
        type: "textarea" as const,
        required: false,
        index: 6,
      },
    ],
  },
  {
    title: "Contact Us & Lead Intake",
    description: "Capture high-intent business leads and support inquiries.",
    slug: "contact-us",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Full Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Morgan Freeman",
      },
      {
        label: "Business Email",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "morgan@business.com",
      },
      {
        label: "Company Name",
        type: "text" as const,
        required: false,
        index: 2,
        placeholder: "Enterprise Inc.",
      },
      {
        label: "How can we help you?",
        type: "select" as const,
        required: true,
        index: 3,
        options: [
          "General Inquiry",
          "Sales & Enterprise Pricing",
          "Technical Support",
          "Partnerships",
          "Press / Media",
        ],
      },
      {
        label: "Project Budget Range",
        type: "select" as const,
        required: false,
        index: 4,
        options: ["Under $5,000", "$5,000 - $15,000", "$15,000 - $50,000", "$50,000+"],
      },
      {
        label: "Estimated Timeline",
        type: "select" as const,
        required: false,
        index: 5,
        options: ["Immediately", "Within 1 Month", "1 - 3 Months", "Flexible / Researching"],
      },
      { label: "Detailed Message", type: "textarea" as const, required: true, index: 6 },
    ],
  },
  {
    title: "Bug Report & Issue Tracker",
    description: "Gather structured technical issue reports from users.",
    slug: "bug-report",
    status: "private" as const,
    accessCode: "bugreport25",
    fields: [
      {
        label: "Issue Summary / Title",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Form submission fails on safari",
      },
      {
        label: "Reporter Email",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "dev@example.com",
      },
      {
        label: "Severity Level",
        type: "select" as const,
        required: true,
        index: 2,
        options: [
          "Low - Minor glitch",
          "Medium - Workaround available",
          "High - Key feature broken",
          "Critical - System blocker",
        ],
      },
      {
        label: "Affected Component",
        type: "select" as const,
        required: true,
        index: 3,
        options: [
          "User Authentication",
          "Dashboard & Analytics",
          "Form Builder / Editor",
          "Integrations & API",
          "Billing & Payments",
        ],
      },
      {
        label: "Steps to Reproduce",
        type: "textarea" as const,
        required: true,
        index: 4,
        placeholder: "1. Navigate to page... 2. Click button...",
      },
      {
        label: "Expected vs Actual Behavior",
        type: "textarea" as const,
        required: false,
        index: 5,
      },
      {
        label: "Screenshot or Log URL",
        type: "text" as const,
        required: false,
        index: 6,
        placeholder: "https://example.com/screenshot.png",
      },
    ],
  },
  {
    title: "Employee Satisfaction Survey",
    description: "Gather anonymous feedback on workplace environment and management.",
    slug: "employee-satisfaction",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Department / Team",
        type: "select" as const,
        required: true,
        index: 0,
        options: [
          "Engineering & Tech",
          "Product & Design",
          "Marketing & Growth",
          "Sales & Business Dev",
          "People & HR",
          "Finance & Operations",
        ],
      },
      { label: "Overall Work Satisfaction", type: "rating" as const, required: true, index: 1 },
      { label: "Work-Life Balance Rating", type: "rating" as const, required: true, index: 2 },
      {
        label: "Do you feel supported by your manager?",
        type: "select" as const,
        required: true,
        index: 3,
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
      },
      {
        label: "What is working well in your team?",
        type: "textarea" as const,
        required: false,
        index: 4,
      },
      {
        label: "Key Challenges or Suggestions for Improvement",
        type: "textarea" as const,
        required: false,
        index: 5,
      },
      {
        label: "Are you satisfied with career growth opportunities?",
        type: "select" as const,
        required: true,
        index: 6,
        options: ["Very Satisfied", "Satisfied", "Needs Improvement", "Unsatisfied"],
      },
    ],
  },
  {
    title: "Product Preorder & Reservation",
    description: "Reserve product stock ahead of launch with customer preferences.",
    slug: "product-preorder",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Customer Full Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Sam Wilson",
      },
      {
        label: "Email Address",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "sam@example.com",
      },
      {
        label: "Shipping Address",
        type: "textarea" as const,
        required: true,
        index: 2,
        placeholder: "Street, City, State, ZIP, Country",
      },
      {
        label: "Product Variant",
        type: "select" as const,
        required: true,
        index: 3,
        options: ["Standard Edition", "Pro Edition", "Collector's Bundle"],
      },
      { label: "Quantity", type: "number" as const, required: true, index: 4 },
      {
        label: "Preferred Payment Method",
        type: "select" as const,
        required: true,
        index: 5,
        options: ["Credit Card", "PayPal", "Bank Wire Transfer", "Crypto"],
      },
      {
        label: "Special Delivery Instructions",
        type: "textarea" as const,
        required: false,
        index: 6,
      },
    ],
  },
  {
    title: "Patient Intake & Medical History",
    description: "Essential medical intake form for healthcare clinics and practices.",
    slug: "patient-intake",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Patient Full Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Robert Chen",
      },
      {
        label: "Email Address",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "robert@example.com",
      },
      { label: "Date of Birth", type: "date" as const, required: true, index: 2 },
      {
        label: "Contact Phone Number",
        type: "text" as const,
        required: true,
        index: 3,
        placeholder: "+1 (555) 018-4491",
      },
      {
        label: "Reason for Visit / Primary Symptoms",
        type: "textarea" as const,
        required: true,
        index: 4,
      },
      {
        label: "Current Prescription Medications",
        type: "textarea" as const,
        required: false,
        index: 5,
        placeholder: "List medications or write None",
      },
      {
        label: "Known Allergies",
        type: "textarea" as const,
        required: false,
        index: 6,
        placeholder: "Penicillin, Latex, etc.",
      },
      {
        label: "Emergency Contact Name & Phone",
        type: "text" as const,
        required: true,
        index: 7,
        placeholder: "Jane Chen - +1 (555) 018-9900",
      },
    ],
  },
  {
    title: "IT Helpdesk & Support Ticket",
    description: "Streamline workplace technical support and hardware requests.",
    slug: "it-helpdesk-ticket",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Requestor Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "David Miller",
      },
      {
        label: "Work Email",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "david.m@company.com",
      },
      {
        label: "Department",
        type: "select" as const,
        required: true,
        index: 2,
        options: ["Engineering", "Sales", "Finance", "HR", "Marketing", "Executive"],
      },
      {
        label: "Category of Issue",
        type: "select" as const,
        required: true,
        index: 3,
        options: [
          "Hardware / Laptop",
          "Software / License Access",
          "Network / VPN",
          "Password Reset",
          "Email & Calendar",
        ],
      },
      {
        label: "Operating System",
        type: "select" as const,
        required: false,
        index: 4,
        options: ["macOS", "Windows", "Linux", "iOS / Android"],
      },
      {
        label: "Detailed Problem Description",
        type: "textarea" as const,
        required: true,
        index: 5,
      },
      {
        label: "Urgency Level",
        type: "select" as const,
        required: true,
        index: 6,
        options: ["Low - Can work normally", "Medium - Work hindered", "High - Completely blocked"],
      },
    ],
  },
  {
    title: "RSVP & Event Guest Planning",
    description: "Collect guest RSVPs, headcount, and dietary preferences for private events.",
    slug: "rsvp-event-planning",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Guest Full Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Emily Watson",
      },
      {
        label: "Email Address",
        type: "email" as const,
        required: true,
        index: 1,
        placeholder: "emily@example.com",
      },
      {
        label: "Will you be attending?",
        type: "select" as const,
        required: true,
        index: 2,
        options: ["Yes, I will be there!", "Regretfully, I cannot attend"],
      },
      {
        label: "Number of Additional Guests (+1s)",
        type: "number" as const,
        required: true,
        index: 3,
      },
      {
        label: "Song Request / Favorite Track",
        type: "text" as const,
        required: false,
        index: 4,
        placeholder: "Artist - Song Title",
      },
      {
        label: "Dietary Requirements",
        type: "select" as const,
        required: false,
        index: 5,
        options: ["None", "Vegetarian", "Vegan", "Gluten-Free", "Nut Allergy"],
      },
      { label: "Message for the Host", type: "textarea" as const, required: false, index: 6 },
    ],
  },
  {
    title: "Client Onboarding Questionnaire",
    description: "Onboard new agency or freelance clients with key project goals.",
    slug: "client-onboarding",
    status: "draft" as const,
    accessCode: null,
    fields: [
      {
        label: "Company / Client Name",
        type: "text" as const,
        required: true,
        index: 0,
        placeholder: "Starlight Media",
      },
      {
        label: "Primary Contact Name",
        type: "text" as const,
        required: true,
        index: 1,
        placeholder: "Sarah Jenkins",
      },
      {
        label: "Primary Contact Email",
        type: "email" as const,
        required: true,
        index: 2,
        placeholder: "sarah@starlight.com",
      },
      {
        label: "Current Website URL",
        type: "text" as const,
        required: false,
        index: 3,
        placeholder: "https://starlight.com",
      },
      {
        label: "Target Audience & Demographics",
        type: "textarea" as const,
        required: true,
        index: 4,
      },
      {
        label: "Top 3 Competitors",
        type: "textarea" as const,
        required: false,
        index: 5,
        placeholder: "Competitor A, Competitor B, Competitor C",
      },
      { label: "Project Launch Target Date", type: "date" as const, required: true, index: 6 },
      {
        label: "Brand Guidelines / Asset Drive Link",
        type: "text" as const,
        required: false,
        index: 7,
        placeholder: "Link to Figma or Google Drive",
      },
    ],
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const { mutateAsync: createForm, isPending } = useCreateForm();
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  const handleSelectTemplate = async (template: (typeof MOCK_TEMPLATES)[number]) => {
    if (isPending) return;
    setSelectedSlug(template.slug);

    const slug = `${template.slug}-${Date.now()}`;

    try {
      const data = await createForm({
        title: template.title,
        description: template.description,
        slug,
        status: template.status,
        accessCode: template.accessCode,
        fields: template.fields.map((f, i) => ({
          ...f,
          index: i,
        })),
      });

      toast.success("Form created from template!");
      router.push(`/b/${data.id}`);
    } catch (error) {
      toast.error("Failed to create form from template");
      console.error("Error creating form from template:", error);
    } finally {
      setSelectedSlug(null);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground mt-1">
            Start quickly with pre-built form templates or let AI generate a custom one.
          </p>
        </div>
        <AiGenerateFormDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_TEMPLATES.map((template) => {
          const isCreating = isPending && selectedSlug === template.slug;
          return (
            <TemplateCard
              key={template.slug}
              title={template.title}
              description={template.description}
              slug={template.slug}
              isLoading={isCreating}
              disabled={isPending}
              onClick={() => handleSelectTemplate(template)}
            />
          );
        })}
      </div>
    </div>
  );
}
