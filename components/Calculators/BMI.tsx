"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Activity, Scale } from "lucide-react";
import { bmiCalculatorSchema } from "@/lib/validators";
import { computeBMI, getBMICategory, convertWeight, convertHeight } from "@/lib/utils";
import { toast } from "sonner";

export function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    try {
      setIsCalculating(true);
      
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);
      
      // Convert to metric if needed
      const weightKg = unit === "imperial" ? convertWeight(weightNum, "lbs", "kg") : weightNum;
      const heightCm = unit === "imperial" ? convertHeight(heightNum, "ft", "cm") : heightNum;
      
      // Validate inputs
      const validatedData = bmiCalculatorSchema.parse({
        weight: weightKg,
        height: heightCm,
        unit,
      });
      
      // Calculate BMI
      const bmi = computeBMI(validatedData.weight, validatedData.height);
      const category = getBMICategory(bmi);
      
      setResult({ bmi, category });
      toast.success("BMI calculated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Please enter valid weight and height values");
      }
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case "underweight":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "normal weight":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "overweight":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "obese":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const getBMIRanges = () => [
    { range: "< 18.5", category: "Underweight", color: "text-blue-400" },
    { range: "18.5 - 24.9", category: "Normal weight", color: "text-green-400" },
    { range: "25.0 - 29.9", category: "Overweight", color: "text-yellow-400" },
    { range: "≥ 30.0", category: "Obese", color: "text-red-400" },
  ];

  return (
    <Card className="steel-plate gym-shadow border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          BMI Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate your Body Mass Index to assess your weight category
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Unit Selection */}
        <Tabs value={unit} onValueChange={(value) => setUnit(value as "metric" | "imperial")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="metric">Metric (kg/cm)</TabsTrigger>
            <TabsTrigger value="imperial">Imperial (lbs/ft)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metric" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight-metric" className="block text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <Input
                  id="weight-metric"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="1"
                  max="500"
                  step="0.1"
                />
              </div>
              
              <div>
                <label htmlFor="height-metric" className="block text-sm font-medium mb-2">
                  Height (cm)
                </label>
                <Input
                  id="height-metric"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="50"
                  max="300"
                  step="0.1"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="imperial" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight-imperial" className="block text-sm font-medium mb-2">
                  Weight (lbs)
                </label>
                <Input
                  id="weight-imperial"
                  type="number"
                  placeholder="154"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="1"
                  max="1000"
                  step="0.1"
                />
              </div>
              
              <div>
                <label htmlFor="height-imperial" className="block text-sm font-medium mb-2">
                  Height (ft)
                </label>
                <Input
                  id="height-imperial"
                  type="number"
                  placeholder="5.74"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="1"
                  max="10"
                  step="0.01"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleCalculate}
            disabled={!weight || !height || isCalculating}
            className="flex-1"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4 mr-2" />
                Calculate BMI
              </>
            )}
          </Button>
          
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
        
        {/* Result Display */}
        {result && (
          <div className="p-6 bg-muted/20 rounded-lg text-center space-y-4">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {result.bmi}
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                Body Mass Index
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Category:</span>
              <Badge 
                variant="outline" 
                className={getCategoryColor(result.category)}
              >
                {result.category}
              </Badge>
            </div>
            
            <div className="text-xs text-muted-foreground">
              * BMI is a screening tool and should not be used as a diagnostic tool.
            </div>
          </div>
        )}
        
        {/* BMI Categories Reference */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">BMI Categories (WHO Standards)</h4>
          <div className="space-y-2">
            {getBMIRanges().map((range, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="font-mono">{range.range}</span>
                <Badge variant="outline" className={range.color}>
                  {range.category}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        {/* Formula Info */}
        <div className="text-xs text-muted-foreground p-3 bg-muted/10 rounded">
          <strong>Formula:</strong> BMI = Weight (kg) ÷ Height² (m²)
          <br />
          <strong>Note:</strong> BMI doesn&apos;t account for muscle mass, bone density, or body composition
        </div>
      </CardContent>
    </Card>
  );
}
