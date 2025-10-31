"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Edit3,
  RotateCcw,
  Minimize2,
  Maximize2,
  Save,
  CheckCircle,
  FileText,
  Sparkles
} from "lucide-react";
import { rewriteCoverLetter, shortenCoverLetter, expandCoverLetter, saveCoverLetterVariant } from "@/actions/cover-letter";

export default function CoverLetterVariants({ coverLetter, onVariantSelected }) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(coverLetter.selectedVariant || coverLetter.variants[0]?.id);
  const [editingVariant, setEditingVariant] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isModifying, setIsModifying] = useState(false);

  const currentVariant = coverLetter.variants.find(v => v.id === selectedVariant);

  const handleVariantSelect = (variantId) => {
    setSelectedVariant(variantId);
    onVariantSelected?.(variantId);
  };

  const handleEditVariant = (variant) => {
    setEditingVariant(variant.id);
    setEditedContent(variant.content);
  };

  const handleSaveEdit = async () => {
    if (!editingVariant) return;

    try {
      await saveCoverLetterVariant(coverLetter.id, editingVariant, editedContent);
      toast.success("Variant updated successfully!");
      setEditingVariant(null);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to update variant");
    }
  };

  const handleRewrite = async (variantId) => {
    setIsModifying(true);
    try {
      const result = await rewriteCoverLetter(coverLetter.id, variantId);
      toast.success("Variant rewritten successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to rewrite variant");
    } finally {
      setIsModifying(false);
    }
  };

  const handleShorten = async (variantId) => {
    setIsModifying(true);
    try {
      const result = await shortenCoverLetter(coverLetter.id, variantId);
      toast.success("Variant shortened successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to shorten variant");
    } finally {
      setIsModifying(false);
    }
  };

  const handleExpand = async (variantId) => {
    setIsModifying(true);
    try {
      const result = await expandCoverLetter(coverLetter.id, variantId);
      toast.success("Variant expanded successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to expand variant");
    } finally {
      setIsModifying(false);
    }
  };

  const handleFinalizeSelection = async () => {
    try {
      await saveCoverLetterVariant(coverLetter.id, selectedVariant, currentVariant.content, true);
      toast.success("Cover letter saved successfully!");
      router.push(`/coverletter/${coverLetter.id}`);
    } catch (error) {
      toast.error(error.message || "Failed to save cover letter");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Perfect Cover Letter</h2>
        <p className="text-muted-foreground">
          We've generated 3 unique variants. Select one and customize it to perfection.
        </p>
      </div>

      {/* Variant Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generated Variants
          </CardTitle>
          <CardDescription>
            Each variant has a different writing style and focus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {coverLetter.variants.map((variant) => (
              <Card
                key={variant.id}
                className={`cursor-pointer transition-all ${
                  selectedVariant === variant.id
                    ? "ring-2 ring-primary border-primary"
                    : "hover:shadow-md"
                }`}
                onClick={() => handleVariantSelect(variant.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg capitalize">
                      {variant.style.replace("-", " ")}
                    </CardTitle>
                    {selectedVariant === variant.id && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {variant.id}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm text-muted-foreground line-clamp-4">
                    {variant.content.substring(0, 200)}...
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditVariant(variant);
                      }}
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRewrite(variant.id);
                      }}
                      disabled={isModifying}
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Rewrite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Variant Preview */}
      {currentVariant && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Selected Variant: {currentVariant.style.replace("-", " ")}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShorten(selectedVariant)}
                  disabled={isModifying}
                >
                  <Minimize2 className="h-4 w-4 mr-1" />
                  Shorten
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleExpand(selectedVariant)}
                  disabled={isModifying}
                >
                  <Maximize2 className="h-4 w-4 mr-1" />
                  Expand
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRewrite(selectedVariant)}
                  disabled={isModifying}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Rewrite
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {currentVariant.content}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Finalize Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleFinalizeSelection}
          className="px-8"
        >
          <Save className="h-5 w-5 mr-2" />
          Save This Cover Letter
        </Button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingVariant} onOpenChange={() => setEditingVariant(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Cover Letter Variant</DialogTitle>
            <DialogDescription>
              Make direct edits to customize your cover letter
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Edit your cover letter content..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingVariant(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}