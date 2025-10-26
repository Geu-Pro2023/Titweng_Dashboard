import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { ImageCapture } from "@/components/ui/image-capture";
import { VerificationResults } from "@/components/verification/VerificationResults";
import { GPSTracker } from "@/components/ui/gps-tracker";
import { verificationAPI } from "@/services/api";
import { toast } from "sonner";

const Verify = () => {
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [cowTag, setCowTag] = useState("");
  const [nosePrintImage, setNosePrintImage] = useState<File | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const handleNosePrintVerify = async () => {
    if (!nosePrintImage) {
      toast.error("Please capture or upload a nose print image");
      return;
    }

    setVerifying(true);
    try {
      const location = (document.getElementById('location') as HTMLInputElement)?.value;
      const result = await verificationAPI.verifyByNose([nosePrintImage], location);
      
      if (result.success) {
        setVerificationResult({
          found: true,
          similarity: result.similarity || 0,
          cow: result.cow_data,
        });
        toast.success("Verification complete!");
      } else {
        setVerificationResult({
          found: false,
          message: result.message || "No matching cow found",
        });
        toast.warning("No matching cow found");
      }
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
      console.error('Nose print verification error:', error);
    } finally {
      setVerifying(false);
    }
  };

  const handleTagLookup = async () => {
    if (!cowTag.trim()) {
      toast.error("Please enter a cow tag");
      return;
    }

    setVerifying(true);
    try {
      const location = (document.getElementById('tagLocation') as HTMLInputElement)?.value;
      const result = await verificationAPI.verifyByTag(cowTag, location);
      
      if (result.success) {
        setVerificationResult({
          found: true,
          similarity: 100,
          cow: result.cow_data,
        });
        toast.success("Tag found!");
      } else {
        setVerificationResult({
          found: false,
          message: result.message || "Cow tag not found",
        });
        toast.warning("Cow tag not found");
      }
    } catch (error: any) {
      toast.error(error.message || "Tag lookup failed");
      console.error('Tag lookup error:', error);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Verification Center</h1>
        <p className="text-muted-foreground mt-1">
          Verify cattle using nose print or tag lookup with GPS location tracking
        </p>
      </div>

      <Tabs defaultValue="noseprint" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="noseprint">Nose Print Verification</TabsTrigger>
          <TabsTrigger value="tag">Tag Lookup</TabsTrigger>
        </TabsList>

        <TabsContent value="noseprint" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Upload Nose Print Image</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload a clear image of the cow's nose print for verification
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="max-w-md mx-auto">
                  <ImageCapture
                    label="Nose Print"
                    onImageCapture={(file) => setNosePrintImage(file)}
                  />
                </div>
                <Button size="lg" className="w-full" onClick={handleNosePrintVerify} disabled={verifying}>
                  <Search className="mr-2 h-4 w-4" />
                  {verifying ? 'Verifying...' : 'Verify Nose Print'}
                </Button>
              </CardContent>
            </Card>
            
            <GPSTracker 
              onLocationUpdate={(location) => setCurrentLocation(location)}
              showMap={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="tag" className="mt-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Tag Lookup</CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter the cow tag to retrieve information
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cowTag">Cow Tag</Label>
                <Input
                  id="cowTag"
                  placeholder="TW-2025-XXX-XXXX"
                  className="font-mono text-lg"
                  value={cowTag}
                  onChange={(e) => setCowTag(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagLocation" className="text-xs">
                  Location (Optional)
                </Label>
                <Input id="tagLocation" placeholder="GPS coordinates or address" />
              </div>
              <Button size="lg" className="w-full" onClick={handleTagLookup} disabled={verifying}>
                <Search className="mr-2 h-4 w-4" />
                {verifying ? 'Looking up...' : 'Lookup Tag'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {verificationResult && (
        <div className="mt-6">
          <VerificationResults result={verificationResult} />
        </div>
      )}

      {/* Loading Modal */}
      {verifying && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Verifying Cattle</h3>
              <p className="text-muted-foreground text-sm">Processing verification and checking database...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
