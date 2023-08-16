import { useState } from "react";

interface Performer {
  id: string; // Assuming performers have some kind of identifier
}

const useSelectedPerformers = () => {
  const [selectedPerformers, setSelectedPerformers] = useState<Set<string>>(
    new Set()
  );

  const handleCheck = (performers: Performer[]) => {
    const updatedSelectedPerformers = new Set(selectedPerformers);

    for (const performer of performers) {
      if (!selectedPerformers.has(performer.id)) {
        updatedSelectedPerformers.add(performer.id);
      } else {
        updatedSelectedPerformers.delete(performer.id);
      }
    }

    setSelectedPerformers(updatedSelectedPerformers);
  };

  return { selectedPerformers, handleCheck };
};

export default useSelectedPerformers;
