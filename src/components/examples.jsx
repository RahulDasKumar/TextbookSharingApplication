import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useChatStore from "@/hooks/useChatStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Examples() {
  const examples = useChatStore((state) => state.examples);
  const setSelectedExample = useChatStore((state) => state.setSelectedExample);
  const selectedExample = useChatStore((state) => state.selectedExample);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const match = examples.find((example) => example.url === location.pathname);
    if (match) {
      setSelectedExample(match);
    }
  }, [location.pathname, examples, setSelectedExample]);

  const handleChange = (value) => {
    const match = examples.find((example) => example.url === value);
    if (match) {
      setSelectedExample(match);
      navigate(value);
    }
  };

  return (
    <div>
      <Select onValueChange={handleChange} value={location.pathname}>
        <SelectTrigger>
          <SelectValue>{selectedExample?.name || "Select example"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {examples.map((example) => (
            <SelectItem key={example.url} value={example.url}>
              {example.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
