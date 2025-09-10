"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Dumbbell, TrendingUp } from "lucide-react";
import { oneRMCalculatorSchema } from "@/lib/validators";
import { estimateOneRepMax } from "@/lib/utils";
import { toast } from "sonner";

export function OneRMCalculator() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    try {
      setIsCalculating(true);
      
      const weightNum = parseFloat(weight);
      const repsNum = parseInt(reps);
      
      // Validate inputs
      const validatedData = oneRMCalculatorSchema.parse({
        weight: weightNum,
        reps: repsNum,
      });
      
      // Calculate 1RM
      const oneRM = estimateOneRepMax(validatedData.weight, validatedData.reps);
      setResult(oneRM);
      
      toast.success("1RM calculated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Please enter valid weight and reps values");
      }
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setWeight("");
    setReps("");
    setResult(null);
  };

  const getStrengthLevel = (oneRM: number): { level: string; color: string } => {
    // These are rough estimates for comparison
    if (oneRM >= 315) return { level: "Elite", color: "text-yellow-400" };
    if (oneRM >= 225) return { level: "Advanced", color: "text-blue-400" };
    if (oneRM >= 185) return { level: "Intermediate", color: "text-green-400" };
    if (oneRM >= 135) return { level: "Novice", color: "text-purple-400" };
    return { level: "Beginner", color: "text-gray-400" };
  };

  return (
    <Card className="steel-plate gym-shadow border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-primary" />
          One Rep Max Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate your estimated one-rep maximum using the Epley formula
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium mb-2">
              Weight (lbs)
            </label>
            <Input
              id="weight"
              type="number"
              placeholder="185"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="1"
              max="1000"
            />
          </div>
          
          <div>
            <label htmlFor="reps" className="block text-sm font-medium mb-2">
              Repetitions
            </label>
            <Input
              id="reps"
              type="number"
              placeholder="5"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              min="1"
              max="50"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleCalculate}
            disabled={!weight || !reps || isCalculating}
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
                Calculate 1RM
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
                {result} lbs
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                Estimated One Rep Maximum
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Strength Level:</span>
              <Badge 
                variant="outline" 
                className={getStrengthLevel(result).color}
              >
                {getStrengthLevel(result).level}
              </Badge>
            </div>
            
            <div className="text-xs text-muted-foreground">
              * This is an estimate based on the Epley formula. Actual 1RM may vary.
            </div>
          </div>
        )}
        
        {/* Formula Info */}
        <div className="text-xs text-muted-foreground p-3 bg-muted/10 rounded">
          <strong>Formula:</strong> 1RM = Weight × (1 + Reps ÷ 30)
          <br />
          <strong>Note:</strong> Most accurate for reps between 1-10
        </div>
      </CardContent>
    </Card>
  );
}
