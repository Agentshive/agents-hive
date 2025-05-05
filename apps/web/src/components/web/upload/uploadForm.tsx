"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import { customAlphabet } from "nanoid";
import { Button } from "~/components/web/ui/button";

// Generate a custom Nano ID with 26-character length
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 26);
const categoryMap: Record<string, number> = {
  "Sales AI Agent": 1,
  "Data Analysis": 2,
  "Voice Agent": 3,
  // Add more mappings as needed
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function XLSXUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an XLSX file first!");
      return;
    }

    setLoading(true);
    setMessage("Processing file...");

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetNames = workbook.SheetNames;

      for (const sheetName of sheetNames) {
        setMessage(`Processing sheet: ${sheetName}...`);

        const worksheet = workbook.Sheets[sheetName];
        const jsonData =
          XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

        // const cleanedData = jsonData.map((row) => {
        //   const cleanRow: { [key: string]: any } = { id: nanoid(), ...row };
        //   Object.keys(cleanRow).forEach((key) => {
        //     if (cleanRow[key] === "") {
        //       cleanRow[key] = null;
        //     }
        //   });
        //   return cleanRow;
        // });
        // const cleanedData = jsonData.map((row) => {
        //   const cleanRow: { [key: string]: any } = { id: nanoid(), ...row };
        
        //   // Replace empty strings with null
        //   Object.keys(cleanRow).forEach((key) => {
        //     if (cleanRow[key] === "") {
        //       cleanRow[key] = null;
        //     }
        //   });
        
        //   // Generate slug if missing and 'name' is available
        //   if (!cleanRow.slug && cleanRow.name) {
        //     cleanRow.slug = String(cleanRow.name)
        //       .toLowerCase()
        //       .replace(/\s+/g, "-")
        //       .replace(/[^a-z0-9\-]/g, "");
        //   }
        
        //   return cleanRow;
        // });
        const cleanedData = jsonData.map((row) => {
          const cleanRow: { [key: string]: any } = { id: nanoid(), ...row };
        
          Object.keys(cleanRow).forEach((key) => {
            if (cleanRow[key] === "") {
              cleanRow[key] = null;
            }
          });
        
          if (!cleanRow.slug && cleanRow.name) {
            cleanRow.slug = String(cleanRow.name)
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9\-]/g, "");
          }
        
          return cleanRow;
        });
        
        const uniqueBySlug = new Map<string, any>();
for (const row of cleanedData) {
  if (row.slug) {
    uniqueBySlug.set(row.slug, row); // Later row overwrites earlier one
  }
}

const dedupedData = Array.from(uniqueBySlug.values());

        

        if (cleanedData.length === 0) {
          setMessage(
            (prev) => `${prev}\nSheet "${sheetName}" is empty, skipping.`
          );
          continue;
        }

        setMessage(
          (prev) =>
            `${prev}\nInserting ${cleanedData.length} rows into table "${sheetName}"...`
        );

        // Insert data into Supabase
        const { data, error } = await supabase
          .from(sheetName)
          .upsert(dedupedData, {
            onConflict: "slug",
          });
          if (sheetName === "Tool") {
            const categoryToToolData = dedupedData
              .map((row) => {
                const categoryName = row.category;
                const toolId = row.id; // generated Nano ID
                const categoryId = categoryMap[categoryName];
          
                if (!categoryId || !toolId) return null;
          
                return {
                  A: categoryId,
                  B: toolId,
                };
              })
              .filter(Boolean); // remove nulls
          
            if (categoryToToolData.length > 0) {
              const { error: linkError } = await supabase
                .from("_CategoryToTool")
                .upsert(categoryToToolData);
          
              if (linkError) {
                setMessage(
                  (prev) =>
                    `${prev}\nError inserting into _CategoryToTool: ${linkError.message}`
                );
              } else {
                setMessage(
                  (prev) => `${prev}\nCategory-to-Tool links inserted successfully!`
                );
              }
            }
          }
          

        if (error) {
          console.error(`Error inserting data into ${sheetName}:`, error);
          setMessage(
            (prev) =>
              `${prev}\nError inserting data into ${sheetName}: ${error.message}`
          );
        } else {
          setMessage(
            (prev) => `${prev}\nData inserted successfully into ${sheetName}!`
          );
        }
      }

      setMessage((prev) => `${prev}\nAll sheets processed!`);
    } catch (error) {
      console.error("Error processing XLSX file:", error);
      setMessage(
        `Error processing file: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4"
      />
      <Button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload XLSX"}
      </Button>

      {message && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg whitespace-pre-line">
          <h3 className="font-semibold mb-2">Status:</h3>
          {message}
        </div>
      )}
    </div>
  );
}
