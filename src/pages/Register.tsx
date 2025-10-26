import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageCapture } from "@/components/ui/image-capture";
import { cattleAPI } from "@/services/api";
import { toast } from "sonner";

const Register = () => {
  const [cowTag, setCowTag] = useState("");
  const [nosePrintImages, setNosePrintImages] = useState<{[key: string]: File}>({});
  const [formData, setFormData] = useState({
    owner_full_name: '',
    owner_email: '',
    owner_phone: '',
    owner_address: '',
    owner_national_id: '',
    breed: '',
    color: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTagInfo();
  }, []);

  const fetchTagInfo = async () => {
    try {
      const data = await cattleAPI.getTagInfo();
      setCowTag(data.next_tag || 'TW-2025-XXX-0001');
    } catch (error) {
      console.error('Failed to fetch tag info:', error);
    }
  };

  const handleImageCapture = (angle: string, file: File) => {
    setNosePrintImages(prev => ({ ...prev, [angle]: file }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const imageCount = Object.keys(nosePrintImages).length;
    if (imageCount < 5) {
      toast.error(`Please capture all 5 nose print images. ${imageCount}/5 completed.`);
      return;
    }

    if (!formData.owner_full_name || !formData.breed || !formData.color || !formData.age) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const files = Object.values(nosePrintImages);
      const registrationData = {
        ...formData,
        age: parseInt(formData.age),
      };
      
      const result = await cattleAPI.register(registrationData, files);
      toast.success(`Cattle registered successfully! Tag: ${result.cow_tag}`);
      
      // Reset form
      setFormData({
        owner_full_name: '',
        owner_email: '',
        owner_phone: '',
        owner_address: '',
        owner_national_id: '',
        breed: '',
        color: '',
        age: '',
      });
      setNosePrintImages({});
      fetchTagInfo(); // Get new tag
    } catch (error: any) {
      toast.error(error.message || 'Failed to register cattle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Register New Cattle</h1>
        <p className="text-muted-foreground mt-1">
          Add a new cow to the management system
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Owner Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Owner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Full Name *</Label>
                <Input 
                  id="ownerName" 
                  placeholder="Enter owner's full name" 
                  value={formData.owner_full_name}
                  onChange={(e) => handleInputChange('owner_full_name', e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="owner@example.com" 
                  value={formData.owner_email}
                  onChange={(e) => handleInputChange('owner_email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+250 XXX XXX XXX" 
                  value={formData.owner_phone}
                  onChange={(e) => handleInputChange('owner_phone', e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Physical Address *</Label>
                <Input 
                  id="address" 
                  placeholder="District, Sector, Cell" 
                  value={formData.owner_address}
                  onChange={(e) => handleInputChange('owner_address', e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationalId">National ID *</Label>
                <Input 
                  id="nationalId" 
                  placeholder="1 XXXX X XXXXXXX X XX" 
                  value={formData.owner_national_id}
                  onChange={(e) => handleInputChange('owner_national_id', e.target.value)}
                  required 
                />
              </div>
            </CardContent>
          </Card>

          {/* Cattle Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Cattle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="breed">Breed *</Label>
                <Select value={formData.breed} onValueChange={(value) => handleInputChange('breed', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select breed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Friesian">Friesian</SelectItem>
                    <SelectItem value="Jersey">Jersey</SelectItem>
                    <SelectItem value="Holstein">Holstein</SelectItem>
                    <SelectItem value="Angus">Angus</SelectItem>
                    <SelectItem value="Sahiwal">Sahiwal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color *</Label>
                <Input 
                  id="color" 
                  placeholder="e.g., Black and White" 
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age (years) *</Label>
                <Input 
                  id="age" 
                  type="number" 
                  min="0" 
                  placeholder="3" 
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label>Generated Cow Tag</Label>
                <div className="rounded-md border border-primary bg-primary-lighter px-4 py-3">
                  <p className="font-mono text-lg font-semibold text-primary">{cowTag}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nose Print Upload */}
        <Card className="shadow-card mt-6">
          <CardHeader>
            <CardTitle>Nose Print Images</CardTitle>
            <p className="text-sm text-muted-foreground">
              Upload 5 clear images of the cow's nose print from different angles
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              {["Front", "Left", "Right", "Top", "Front2"].map((angle) => (
                <ImageCapture
                  key={angle}
                  label={angle}
                  onImageCapture={(file) => handleImageCapture(angle, file)}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                * Ensure images are well-lit, clear, and show the entire nose print pattern
              </p>
              <p className="text-xs font-medium text-primary">
                {Object.keys(nosePrintImages).length}/5 images captured
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button type="submit" size="lg" className="flex-1 md:flex-none" disabled={loading}>
            {loading ? 'Registering...' : 'Register Cattle'}
          </Button>
          <Button type="button" variant="secondary" size="lg" disabled={loading}>
            Save as Draft
          </Button>
          <Button type="button" variant="outline" size="lg" disabled={loading}>
            Cancel
          </Button>
        </div>

        {/* Loading Modal */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Registering Cattle</h3>
                <p className="text-muted-foreground text-sm">Processing nose prints and saving to database...</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
