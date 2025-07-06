// src/hooks/useGlobalData.ts
import { useEffect, useState } from "react";
import { getDataGlobals } from "../api";

interface DataGlobal {
  id: number;
  name: string;
  value: string;
}

type GlobalDataMap = Record<string, string>;

export const useGlobalData = () => {
  const [data, setData] = useState<GlobalDataMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobals = async () => {
      try {
        const res: DataGlobal[] = await getDataGlobals();
        const mapped: GlobalDataMap = {};
        res.forEach((item) => {
          mapped[item.name] = item.value;
        });
        setData(mapped);
      } catch (err) {
        console.error("Error cargando datos globales", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobals();
  }, []);

  return { data, loading };
};
