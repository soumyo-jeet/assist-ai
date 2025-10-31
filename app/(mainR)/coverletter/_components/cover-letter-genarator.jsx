"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, FileText, Building2, Briefcase, FileInput, Palette, Factory, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import { coverLetterTemplates, getJobTitlesForIndustry } from "@/datas/templates";
import CoverLetterVariants from "./cover-letter-variants";

export default function CoverLetterGenerator() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [jobTitles, setJobTitles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter variants generated successfully!");
      // Don't redirect immediately - show variants for selection
    }
  }, [generatedLetter]);

  useEffect(() => {
    if (selectedIndustry) {
      const titles = getJobTitlesForIndustry(selectedIndustry);
      setJobTitles(titles);
    } else {
      setJobTitles([]);
    }
  }, [selectedIndustry]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Cover Letter Generator</CardTitle>
              <CardDescription>
                Craft the perfect cover letter tailored to your dream job
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Template Selection Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Choose Your Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the tone and industry that best fits your application
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="tone" className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    Tone
                  </Label>
                  <Select onValueChange={(value) => setValue("tone", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {coverLetterTemplates.tones.map((tone) => (
                        <SelectItem key={tone.id} value={tone.id}>
                          <div>
                            <div className="font-medium">{tone.name}</div>
                            <div className="text-xs text-muted-foreground">{tone.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.tone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.tone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="industry" className="flex items-center gap-2">
                    <Factory className="h-4 w-4 text-muted-foreground" />
                    Industry
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("industry", value);
                      setSelectedIndustry(value);
                      setValue("jobTitle", ""); // Reset job title when industry changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {coverLetterTemplates.industries.map((industry) => (
                        <SelectItem key={industry.id} value={industry.id}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="jobTitle" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Suggested Job Title
                  </Label>
                  <Select onValueChange={(value) => setValue("jobTitle", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job title" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTitles.map((title) => (
                        <SelectItem key={title} value={title}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.jobTitle && (
                    <p className="text-sm text-sm text-red-500 mt-1">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="companyName" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Google, Microsoft, etc."
                  {...register("companyName")}
                  className="h-11"
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="jobTitle" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Software Engineer, Product Manager (or select from suggestions above)"
                  {...register("jobTitle")}
                  className="h-11"
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="jobDescription" className="flex items-center gap-2">
                <FileInput className="h-4 w-4 text-muted-foreground" />
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the full job description here..."
                className="min-h-[180px]"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={generating}
                className="w-full sm:w-auto"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className={`mr-2 h-4 w-4 transition-all ${isHovered ? 'scale-110' : ''}`} />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Show variants after generation */}
      {generatedLetter && (
        <div className="mt-8">
          <CoverLetterVariants
            coverLetter={generatedLetter}
            onVariantSelected={(variantId) => {
              // Handle variant selection if needed
            }}
          />
        </div>
      )}
    </div>
  );
}