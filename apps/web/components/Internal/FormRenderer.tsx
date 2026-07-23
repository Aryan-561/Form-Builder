"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useForm as useFormQuery } from "~/hooks/use-form";
import { useSubmitForm } from "~/hooks/use-submitform";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Star } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileX2,
  Send,
} from "lucide-react";

interface FormFieldItem {
  id: string;
  label: string;
  type: string;
  placeholder?: string | null;
  required?: boolean;
  options?: string[] | null;
  min?: number;
  max?: number;
  index: number;
}

interface FormRendererProps {
  mode: "preview" | "deploy";
}

export function FormRenderer({ mode }: FormRendererProps) {
  const { id } = useParams();
  const formId = id as string;
  const { data: formData, isLoading, isError, refetch } = useFormQuery(formId);

  const [accessGranted, setAccessGranted] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [accessError, setAccessError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamically build Zod Schema from fields
  const schema = useMemo(() => {
    if (!formData?.fields) return z.object({});
    const shape: Record<string, z.ZodTypeAny> = {};

    formData.fields.forEach((field: FormFieldItem) => {
      let fieldSchema: z.ZodTypeAny;

      switch (field.type) {
        case "email":
          fieldSchema = z.string().email("Please enter a valid email address");
          break;
        case "number": {
          let numSchema = z.string().refine((v) => v === "" || !isNaN(Number(v)), {
            message: "Must be a valid number",
          });
          if (field.min !== undefined) {
            numSchema = numSchema.refine((v) => v === "" || Number(v) >= field.min!, {
              message: `Minimum value is ${field.min}`,
            });
          }
          if (field.max !== undefined) {
            numSchema = numSchema.refine((v) => v === "" || Number(v) <= field.max!, {
              message: `Maximum value is ${field.max}`,
            });
          }
          fieldSchema = numSchema;
          break;
        }
        case "rating":
          fieldSchema = z.union([z.number(), z.string()]);
          if (field.required) {
            fieldSchema = fieldSchema.refine(
              (v) => Number(v) >= (field.min ?? 1) && Number(v) <= (field.max ?? 5),
              {
                message: `Please select a rating for "${field.label}"`,
              },
            );
          } else {
            fieldSchema = fieldSchema.optional();
          }
          shape[field.id] = fieldSchema;
          return;
        case "date":
          fieldSchema = z.string();
          if (field.required) {
            fieldSchema = (fieldSchema as z.ZodString).min(
              1,
              `Please select a date for "${field.label}"`,
            );
          } else {
            fieldSchema = fieldSchema.optional();
          }
          shape[field.id] = fieldSchema;
          return;
        case "checkbox": {
          const optsList = field.options ?? [];
          if (optsList.length > 0) {
            let arrSchema: z.ZodTypeAny = z.array(z.string());
            if (field.required) {
              arrSchema = (arrSchema as z.ZodArray<z.ZodString>).min(
                1,
                `Please select at least one option for "${field.label}"`,
              );
            } else {
              arrSchema = arrSchema.optional();
            }
            shape[field.id] = arrSchema;
          } else {
            let singleSchema: z.ZodTypeAny = z.union([z.boolean(), z.string()]);
            if (field.required) {
              singleSchema = singleSchema.refine((val) => Boolean(val) === true, {
                message: `You must check "${field.label}"`,
              });
            } else {
              singleSchema = singleSchema.optional();
            }
            shape[field.id] = singleSchema;
          }
          return;
        }
        default: {
          let strSchema: z.ZodTypeAny =
            field.type === "email"
              ? z.string().email("Please enter a valid email address")
              : z.string();
          if (field.min !== undefined) {
            strSchema = (strSchema as z.ZodString).min(
              field.min,
              `"${field.label}" must be at least ${field.min} characters`,
            );
          }
          if (field.max !== undefined) {
            strSchema = (strSchema as z.ZodString).max(
              field.max,
              `"${field.label}" cannot exceed ${field.max} characters`,
            );
          }
          fieldSchema = strSchema;
          break;
        }
      }

      if (field.required && field.min === undefined) {
        fieldSchema = (fieldSchema as z.ZodString).min(1, `"${field.label}" is required`);
      } else if (!field.required && field.min === undefined && field.max === undefined) {
        fieldSchema = fieldSchema.optional();
      }

      shape[field.id] = fieldSchema;
    });

    return z.object(shape);
  }, [formData?.fields]);

  // Build default values
  const defaultValues = useMemo(() => {
    if (!formData?.fields) return {};
    const defaults: Record<string, any> = {};
    formData.fields.forEach((f: FormFieldItem) => {
      if (f.type === "checkbox") {
        defaults[f.id] = [];
      } else if (f.type === "rating") {
        defaults[f.id] = 0;
      } else {
        defaults[f.id] = "";
      }
    });
    return defaults;
  }, [formData?.fields]);

  const form = useForm<Record<string, any>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
    values: defaultValues,
    mode: "onBlur",
  });

  const submitFormMutation = useSubmitForm();

  const onSubmit = async (values: Record<string, any>) => {
    let userEmail: string | undefined = undefined;
    const formattedValues: { formFieldId: string; value: string }[] = [];

    if (formData?.fields) {
      formData.fields.forEach((field: FormFieldItem) => {
        const rawVal = values[field.id];
        if (rawVal === undefined || rawVal === null || rawVal === "") return;
        if (Array.isArray(rawVal) && rawVal.length === 0) return;

        let stringVal = "";
        if (Array.isArray(rawVal)) {
          stringVal = rawVal.join(", ");
        } else {
          stringVal = String(rawVal);
        }

        if (field.type === "email" && stringVal.includes("@")) {
          userEmail = stringVal;
        }

        formattedValues.push({
          formFieldId: field.id,
          value: stringVal,
        });
      });
    }

    if (formattedValues.length === 0) {
      toast.error("Please fill in at least one field before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitFormMutation.mutateAsync({
        formId,
        email: userEmail,
        values: formattedValues,
      });
      toast.success("Form response submitted successfully!");
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessError("");
    if (!accessCodeInput.trim()) {
      setAccessError("Access code is required.");
      return;
    }
    if (formData?.accessCode && accessCodeInput.trim() === formData.accessCode.trim()) {
      toast.success("Access granted!");
      setAccessGranted(true);
    } else {
      setAccessError("Invalid access code. Please try again.");
    }
  };

  // 1. Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-xl space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Error state
  if (isError || !formData) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center max-w-sm space-y-5">
          <div className="mx-auto size-14 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center border border-red-200 dark:border-red-900/50">
            <AlertTriangle className="size-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Form Not Found
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We couldn&apos;t load the form. Please check the URL or try again.
            </p>
          </div>
          <Button onClick={() => refetch()} variant="outline" className="rounded-lg h-9 text-xs">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // 3. Deploy mode Status Checks
  if (mode === "deploy") {
    if (formData.status === "draft" || formData.status === "unpublish") {
      return (
        <div className="min-h-screen bg-[#FAFBFC] dark:bg-slate-950 flex items-center justify-center p-6">
          <div className="text-center max-w-sm space-y-5">
            <div className="mx-auto size-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <FileX2 className="size-6 text-slate-500" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Form Unavailable
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {formData.status === "draft"
                  ? "This form is currently in draft mode and not available for submissions."
                  : "This form has been unpublished by its owner."}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (formData.status === "private" && !accessGranted) {
      return (
        <div className="min-h-screen bg-[#FAFBFC] dark:bg-slate-950 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <div className="mx-auto size-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
                <Lock className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Protected Form
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enter access code to view &ldquo;{formData.title}&rdquo;
                </p>
              </div>
            </div>

            <form
              onSubmit={handleVerifyAccessCode}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="accessCode"
                  className="text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  Access Code
                </Label>
                <div className="relative">
                  <Input
                    id="accessCode"
                    type={showCode ? "text" : "password"}
                    placeholder="Enter access code..."
                    value={accessCodeInput}
                    onChange={(e) => setAccessCodeInput(e.target.value)}
                    className="pr-10 h-10 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCode ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {accessError && <p className="text-xs text-red-600">{accessError}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-10 rounded-lg"
              >
                <ShieldCheck className="size-4 mr-2" /> Unlock Form
              </Button>
            </form>
          </div>
        </div>
      );
    }
  }

  // 4. Success State
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center max-w-sm space-y-5">
          <div className="mx-auto size-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle2 className="size-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Response Submitted
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Thank you for filling out &ldquo;{formData.title}&rdquo;.
            </p>
          </div>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="rounded-lg h-9 text-xs"
          >
            Submit Another Response
          </Button>
        </div>
      </div>
    );
  }

  // 5. Render Main Form
  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-slate-950 py-12 px-4">
      <div className="w-full max-w-xl mx-auto space-y-5">
        {mode === "preview" && (
          <div className="bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 px-4 py-2.5 rounded-lg flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-2">
              <Eye className="size-3.5 text-blue-600" /> Preview Mode — Status:{" "}
              <strong className="uppercase font-semibold">{formData.status}</strong>
            </span>
          </div>
        )}

        {/* Form Header */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {formData.title}
          </h1>
          {formData.description && (
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {formData.description}
            </p>
          )}
        </div>

        {/* Dynamic Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formData.fields && formData.fields.length > 0 ? (
              [...formData.fields]
                .sort((a, b) => a.index - b.index)
                .map((field: FormFieldItem) => (
                  <div
                    key={field.id}
                    className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name={field.id}
                      render={({ field: rhfField }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium text-slate-900 dark:text-slate-100 block">
                            {field.label}
                            {field.required && (
                              <span className="text-blue-600 ml-1 font-bold">*</span>
                            )}
                          </FormLabel>

                          <FormControl>{renderControl(field, rhfField)}</FormControl>

                          <FormMessage className="text-xs text-red-600 mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                ))
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 text-sm">This form has no fields added yet.</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !formData.fields?.length}
              className="w-full h-11 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="size-4 mr-2" /> Submit Response
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function renderControl(field: FormFieldItem, rhfField: any) {
  const placeholder = field.placeholder || "";

  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          {...rhfField}
          placeholder={placeholder}
          rows={4}
          minLength={field.min}
          maxLength={field.max}
          className="resize-none rounded-lg text-sm"
        />
      );

    case "email":
      return (
        <Input
          {...rhfField}
          type="email"
          minLength={field.min}
          maxLength={field.max}
          placeholder={placeholder || "your@email.com"}
          className="h-10 rounded-lg text-sm"
        />
      );

    case "number":
      return (
        <Input
          {...rhfField}
          type="number"
          min={field.min}
          max={field.max}
          placeholder={placeholder || "0"}
          className="h-10 rounded-lg text-sm"
        />
      );

    case "select":
      return (
        <Select value={rhfField.value ?? ""} onValueChange={rhfField.onChange}>
          <SelectTrigger className="w-full h-10 rounded-lg text-sm">
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "radio":
      return (
        <RadioGroup
          value={rhfField.value ?? ""}
          onValueChange={rhfField.onChange}
          className="grid gap-2 pt-1"
        >
          {(field.options ?? []).map((opt) => (
            <div
              key={opt}
              className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <RadioGroupItem value={opt} id={`${field.id}-${opt}`} />
              <Label
                htmlFor={`${field.id}-${opt}`}
                className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300"
              >
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    case "checkbox": {
      const optionsList = field.options ?? [];
      if (optionsList.length > 0) {
        const currentValues: string[] = Array.isArray(rhfField.value) ? rhfField.value : [];
        return (
          <div className="grid gap-2 pt-1">
            {optionsList.map((opt) => {
              const checked = currentValues.includes(opt);
              return (
                <div
                  key={opt}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <Checkbox
                    id={`${field.id}-${opt}`}
                    checked={checked}
                    onCheckedChange={(val) => {
                      if (val) rhfField.onChange([...currentValues, opt]);
                      else rhfField.onChange(currentValues.filter((v) => v !== opt));
                    }}
                  />
                  <Label
                    htmlFor={`${field.id}-${opt}`}
                    className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300 flex-1"
                  >
                    {opt}
                  </Label>
                </div>
              );
            })}
          </div>
        );
      }

      // Single Checkbox (e.g. Terms & Privacy Policy confirmation)
      const isChecked = Boolean(rhfField.value);
      return (
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 p-3.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <Checkbox
            id={field.id}
            checked={isChecked}
            onCheckedChange={(val) => rhfField.onChange(Boolean(val))}
          />
          <Label
            htmlFor={field.id}
            className="cursor-pointer text-sm font-normal text-slate-700 dark:text-slate-300 leading-snug flex-1"
          >
            {placeholder || "I accept the Privacy Policy & Terms of Service"}
          </Label>
        </div>
      );
    }

    case "rating": {
      const ratingValue = Number(rhfField.value) || 0;
      return (
        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= ratingValue;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => rhfField.onChange(star)}
                  className="p-1 rounded-md transition-all transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`size-7 transition-colors ${
                      isFilled
                        ? "fill-amber-400 text-amber-400 drop-shadow-xs"
                        : "text-slate-300 dark:text-slate-700 hover:text-amber-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          {ratingValue > 0 && (
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              {ratingValue} / 5 Stars
            </span>
          )}
        </div>
      );
    }

    case "date": {
      const rawValue = rhfField.value;
      const selectedDate = rawValue ? new Date(rawValue) : undefined;
      const isValidDate = selectedDate && !isNaN(selectedDate.getTime());

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className={`w-full h-10 justify-start text-left font-normal rounded-lg text-sm border-slate-200 dark:border-slate-800 ${
                !isValidDate ? "text-slate-400" : "text-slate-900 dark:text-slate-100"
              }`}
            >
              <CalendarIcon className="mr-2 size-4 text-slate-500" />
              {isValidDate ? format(selectedDate, "PPP") : placeholder || "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  rhfField.onChange(format(date, "yyyy-MM-dd"));
                } else {
                  rhfField.onChange("");
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    }

    default:
      return (
        <Input
          {...rhfField}
          type={field.type || "text"}
          minLength={field.min}
          maxLength={field.max}
          placeholder={placeholder}
          className="h-10 rounded-lg text-sm"
        />
      );
  }
}
