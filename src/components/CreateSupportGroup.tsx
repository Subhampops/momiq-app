import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Users, Heart, Baby, AlertCircle, Activity, Smile, Briefcase, User, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CreateSupportGroupProps {
  onBack: () => void;
  onCreateGroup: (group: NewGroupData) => void;
}

export interface NewGroupData {
  name: string;
  category: string;
  description: string;
  visibility: 'public' | 'private';
  imageUrl?: string;
}

const categories = [
  'Pregnancy',
  'Medical',
  'Postpartum',
  'Parenting',
  'Wellness',
  'Support',
  'Lifestyle'
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Pregnancy': <Baby className="h-5 w-5" />,
  'Medical': <AlertCircle className="h-5 w-5" />,
  'Postpartum': <Activity className="h-5 w-5" />,
  'Parenting': <Baby className="h-5 w-5" />,
  'Wellness': <Smile className="h-5 w-5" />,
  'Support': <Heart className="h-5 w-5" />,
  'Lifestyle': <Briefcase className="h-5 w-5" />
};

const categoryColors: Record<string, string> = {
  'Pregnancy': 'bg-pink-50 text-pink-600',
  'Medical': 'bg-red-50 text-red-600',
  'Postpartum': 'bg-purple-50 text-purple-600',
  'Parenting': 'bg-green-50 text-green-600',
  'Wellness': 'bg-blue-50 text-blue-600',
  'Support': 'bg-gray-50 text-gray-600',
  'Lifestyle': 'bg-amber-50 text-amber-600'
};

export function CreateSupportGroup({ onBack, onCreateGroup }: CreateSupportGroupProps) {
  const [formData, setFormData] = useState<NewGroupData>({
    name: '',
    category: '',
    description: '',
    visibility: 'public',
    imageUrl: undefined
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof NewGroupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const mockImageUrl = 'https://images.unsplash.com/photo-1566055391257-6b51b000d65f?w=400';
    setUploadedImage(mockImageUrl);
    setFormData(prev => ({ ...prev, imageUrl: mockImageUrl }));
  };

  const removeImage = () => {
    setUploadedImage(null);
    setFormData(prev => ({ ...prev, imageUrl: undefined }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreateGroup(formData);
      // Reset form
      setFormData({
        name: '',
        category: '',
        description: '',
        visibility: 'public',
        imageUrl: undefined
      });
      setUploadedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-pink-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-pink-600">Create New Group</h1>
              <p className="text-gray-600 mt-1">Build a supportive community for mothers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex justify-center">
          <Card className="w-full max-w-3xl border-pink-100 shadow-lg">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-gray-800">Group Details</CardTitle>
                <CardDescription>
                  Create a safe and supportive space for mothers to connect
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Group Name */}
                <div className="space-y-2">
                  <Label htmlFor="groupName" className="text-gray-700">
                    Group Name <span className="text-pink-500">*</span>
                  </Label>
                  <Input
                    id="groupName"
                    type="text"
                    placeholder="e.g., Twin Moms Support Circle"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`border-pink-200 focus:border-pink-400 focus:ring-pink-400 ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700">
                    Category <span className="text-pink-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger
                      id="category"
                      className={`border-pink-200 focus:border-pink-400 focus:ring-pink-400 ${
                        errors.category ? 'border-red-500' : ''
                      }`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${categoryColors[category]}`}>
                              {categoryIcons[category]}
                            </div>
                            {category}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category}</p>
                  )}
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Short Description <span className="text-pink-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose of your group and what members can expect..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={`min-h-[120px] border-pink-200 focus:border-pink-400 focus:ring-pink-400 resize-none ${
                      errors.description ? 'border-red-500' : ''
                    }`}
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description}</p>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">
                      {formData.description.length}/200
                    </p>
                  </div>
                </div>

                {/* Visibility Toggle */}
                <div className="space-y-3">
                  <Label className="text-gray-700">
                    Group Visibility <span className="text-pink-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.visibility}
                    onValueChange={(value: 'public' | 'private') => 
                      handleInputChange('visibility', value)
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3 p-4 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="public" id="public" className="mt-0.5" />
                      <div className="flex-1">
                        <Label
                          htmlFor="public"
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-pink-600" />
                            <span className="text-gray-800">Public</span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Anyone can find and join this group
                          </p>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="private" id="private" className="mt-0.5" />
                      <div className="flex-1">
                        <Label
                          htmlFor="private"
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="h-4 w-4 text-pink-600" />
                            <span className="text-gray-800">Private</span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Members need approval to join
                          </p>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Upload Group Image */}
                <div className="space-y-3">
                  <Label className="text-gray-700">
                    Group Image (Optional)
                  </Label>
                  
                  {uploadedImage ? (
                    <div className="relative inline-block">
                      <div className="w-full sm:w-64 h-48 rounded-lg overflow-hidden border-2 border-pink-200">
                        <ImageWithFallback
                          src={uploadedImage}
                          alt="Group image"
                          className="w-full h-full object-cover"
                          query="community support group"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-8 w-8 bg-white border-2 border-pink-200 rounded-full hover:bg-pink-50"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4 text-pink-600" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      onClick={handleImageUpload}
                      className="w-full sm:w-64 h-48 border-2 border-dashed border-pink-300 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-pink-50 transition-colors group"
                    >
                      <div className="p-4 bg-pink-100 rounded-full group-hover:bg-pink-200 transition-colors">
                        <Upload className="h-6 w-6 text-pink-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-gray-700 mb-1">Click to upload image</p>
                        <p className="text-gray-500 text-sm">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview Card */}
                {formData.name && formData.category && formData.description && (
                  <div className="space-y-2 pt-4 border-t border-pink-100">
                    <Label className="text-gray-700">Preview</Label>
                    <Card className="border-pink-200 hover:shadow-md transition-shadow">
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-xl ${categoryColors[formData.category]}`}>
                            {categoryIcons[formData.category]}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`px-3 py-1 rounded-full text-xs ${
                              formData.visibility === 'public' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {formData.visibility === 'public' ? 'Public' : 'Private'}
                            </div>
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-gray-800">{formData.name}</CardTitle>
                          <CardDescription className="mt-2">
                            {formData.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>0 Members</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end bg-gray-50 border-t border-pink-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="w-full sm:w-auto border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Create Group
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
