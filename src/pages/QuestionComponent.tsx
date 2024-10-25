import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionComponentProps {
  question: Question;
  answer: number;
  onAnswerChange: (value: string) => void;
}

export default function QuestionComponent({
  question,
  answer,
  onAnswerChange,
}: QuestionComponentProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
      <RadioGroup
        value={answer !== -1 ? answer.toString() : ""}
        onValueChange={onAnswerChange}
        className="space-y-2"
      >
        {question.options.map((option, index) => {
          const isSelected = answer === index;
          return (
            <div
              key={index}
              className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer ${
                isSelected ? "bg-blue-500 text-white" : "bg-slate-100"
              }`}
              onClick={() => onAnswerChange(index.toString())}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                className="hidden"
              />
              <Label
                htmlFor={`option-${index}`}
                className="text-base cursor-pointer"
              >
                {option}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
