"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Upload, FileText, Briefcase, GraduationCap, Award } from "lucide-react";
import { importLinkedInData } from "@/actions/resume";
import useFetch from "@/hooks/use-fetch";

const linkedinImportSchema = z.object({
  profileUrl: z.string().url("Please enter a valid LinkedIn URL").optional(),
  profileData: z.string().min(10, "Please provide LinkedIn profile data").optional(),
}).refine((data) => data.profileUrl || data.profileData, {
  message: "Please provide either a LinkedIn URL or paste profile data",
  path: ["profileUrl"],
});

export default function LinkedInImport({ onImportSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [importMethod, setImportMethod] = useState("url"); // "url" or "paste"
  const [parsedData, setParsedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(linkedinImportSchema),
  });

  const {
    loading: importing,
    fn: importFn,
    data: importResult,
  } = useFetch(importLinkedInData);

  const onSubmit = async (data) => {
    try {
      const result = await importFn({
        method: importMethod,
        ...data,
      });

      if (result) {
        setParsedData(result);
        toast.success("LinkedIn data imported successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to import LinkedIn data");
    }
  };

  const handleApplyData = () => {
    if (parsedData && onImportSuccess) {
      onImportSuccess(parsedData);
      setIsOpen(false);
      reset();
      setParsedData(null);
      toast.success("LinkedIn data applied to resume!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          Import from LinkedIn
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Import from LinkedIn
          </DialogTitle>
          <DialogDescription>
            Import your professional information from LinkedIn to quickly populate your resume.
          </DialogDescription>
        </DialogHeader>

        {!parsedData ? (
          <div className="space-y-6">
            {/* Import Method Selection */}
            <div className="flex gap-2">
              <Button
                variant={importMethod === "url" ? "default" : "outline"}
                onClick={() => setImportMethod("url")}
                className="flex-1"
              >
                <User className="h-4 w-4 mr-2" />
                Connect LinkedIn
              </Button>
              <Button
                variant={importMethod === "paste" ? "default" : "outline"}
                onClick={() => setImportMethod("paste")}
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" />
                Paste Data
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {importMethod === "url" ? (
                <div className="space-y-3">
                  <Label htmlFor="profileUrl">LinkedIn Profile URL</Label>
                  <Input
                    id="profileUrl"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    {...register("profileUrl")}
                  />
                  {errors.profileUrl && (
                    <p className="text-sm text-red-500">{errors.profileUrl.message}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Note: Direct URL import requires LinkedIn API access. For now, please use the "Paste Data" option.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="profileData">LinkedIn Profile Data</Label>
                  <Textarea
                    id="profileData"
                    placeholder="Paste your LinkedIn profile information here. You can export your profile data from LinkedIn and paste the relevant sections."
                    className="min-h-[200px]"
                    {...register("profileData")}
                  />
                  {errors.profileData && (
                    <p className="text-sm text-red-500">{errors.profileData.message}</p>
                  )}
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>How to get your LinkedIn data:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Go to LinkedIn → Settings & Privacy → Data Privacy</li>
                      <li>Click "Get a copy of your data"</li>
                      <li>Select "Want something in particular?" and choose relevant sections</li>
                      <li>Download and extract the ZIP file</li>
                      <li>Copy the content from relevant files (Profile, Positions, Education, etc.)</li>
                    </ol>
                  </div>
                </div>
              )}

              <Button type="submit" disabled={importing} className="w-full">
                {importing ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </>
                )}
              </Button>
            </form>
          </div>
        ) : (
          /* Preview Parsed Data */
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Import Preview</h3>
              <p className="text-sm text-muted-foreground">
                Review the imported data before applying it to your resume.
              </p>
            </div>

            <div className="grid gap-4">
              {parsedData.summary && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{parsedData.summary}</p>
                  </CardContent>
                </Card>
              )}

              {parsedData.experience && parsedData.experience.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Experience ({parsedData.experience.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {parsedData.experience.slice(0, 3).map((exp, index) => (
                        <div key={index} className="border-l-2 border-muted pl-3">
                          <h4 className="font-medium text-sm">{exp.title}</h4>
                          <p className="text-xs text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground">{exp.duration}</p>
                        </div>
                      ))}
                      {parsedData.experience.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          ...and {parsedData.experience.length - 3} more positions
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {parsedData.education && parsedData.education.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Education ({parsedData.education.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {parsedData.education.slice(0, 2).map((edu, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-sm">{edu.degree}</h4>
                          <p className="text-xs text-muted-foreground">{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {parsedData.skills && parsedData.skills.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Skills ({parsedData.skills.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {parsedData.skills.slice(0, 10).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {parsedData.skills.length > 10 && (
                        <Badge variant="outline" className="text-xs">
                          +{parsedData.skills.length - 10} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setParsedData(null)}>
                Back to Import
              </Button>
              <Button onClick={handleApplyData}>
                Apply to Resume
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}