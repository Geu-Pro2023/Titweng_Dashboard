import { CheckCircle, XCircle, AlertCircle, Phone, Mail, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VerificationResultsProps {
  result?: {
    found: boolean;
    similarity: number;
    cow?: {
      tag: string;
      breed: string;
      color: string;
      age: number;
      owner: {
        name: string;
        phone: string;
        email: string;
      };
      lastVerified: string;
      location: string;
    };
  };
}

export const VerificationResults = ({ result }: VerificationResultsProps) => {
  if (!result) return null;

  const getResultColor = () => {
    if (!result.found) return "border-destructive bg-destructive/5";
    if (result.similarity >= 95) return "border-success bg-success/5";
    if (result.similarity >= 85) return "border-warning bg-warning/5";
    return "border-destructive bg-destructive/5";
  };

  const getResultIcon = () => {
    if (!result.found) return <XCircle className="h-12 w-12 text-destructive" />;
    if (result.similarity >= 95) return <CheckCircle className="h-12 w-12 text-success" />;
    return <AlertCircle className="h-12 w-12 text-warning" />;
  };

  const getResultTitle = () => {
    if (!result.found) return "❌ NO MATCH FOUND";
    if (result.similarity >= 95) return `✅ MATCH FOUND (${result.similarity}% Similarity)`;
    return `⚠️ PARTIAL MATCH (${result.similarity}% Similarity)`;
  };

  return (
    <Card className={`shadow-card border-2 ${getResultColor()}`}>
      <CardHeader>
        <div className="flex items-center gap-4">
          {getResultIcon()}
          <div>
            <CardTitle className="text-2xl">{getResultTitle()}</CardTitle>
            {!result.found && (
              <p className="text-sm text-muted-foreground mt-1">
                The submitted nose print or tag does not match any cattle in the system
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      {result.found && result.cow && (
        <CardContent>
          <div className="p-6 rounded-lg border bg-card">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cow Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  🐄 Cattle Information
                </h3>
                <div>
                  <p className="text-sm text-muted-foreground">Cow Tag:</p>
                  <p className="font-mono font-bold text-primary text-xl">
                    {result.cow.tag}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Breed:</p>
                    <p className="font-medium">{result.cow.breed}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Color:</p>
                    <p className="font-medium">{result.cow.color}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Age:</p>
                    <p className="font-medium">{result.cow.age} years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status:</p>
                    <Badge className="bg-success/10 text-success">Active</Badge>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  👤 Owner Information
                </h3>
                <div>
                  <p className="font-semibold text-lg">{result.cow.owner.name}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{result.cow.owner.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{result.cow.owner.email}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">Last Verified:</p>
                  <p className="text-sm font-medium">
                    📍 {result.cow.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.cow.lastVerified}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
              <Button>
                <Eye className="h-4 w-4 mr-2" />
                View Full Details
              </Button>
              <Button variant="secondary">
                <Phone className="h-4 w-4 mr-2" />
                Contact Owner
              </Button>
              <Button variant="secondary">
                🔍 Verify Another
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
