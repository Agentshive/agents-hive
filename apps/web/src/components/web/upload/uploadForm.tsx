"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import { Button } from "~/components/web/ui/button";

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
      // Read the XLSX file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);

      // Get all sheet names
      const sheetNames = workbook.SheetNames;

      for (const sheetName of sheetNames) {
        setMessage(`Processing sheet: ${sheetName}...`);

        // Convert sheet to JSON
        const worksheet = workbook.Sheets[sheetName];
        const jsonData =
          XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

        // Clean data - convert empty strings to null
        const cleanedData = jsonData.map((row) => {
          const cleanRow = { ...row };
          Object.keys(cleanRow).forEach((key) => {
            if (cleanRow[key] === "") {
              cleanRow[key] = null;
            }
          });
          return cleanRow;
        });

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
          .upsert(cleanedData, {
            onConflict: "id",
          });

        if (error) {
          console.error(`Error inserting data into ${sheetName}:`, error);
          setMessage(
            (prev) =>
              `${prev}\nError inserting data into ${sheetName}: ${error.message}`
          );
        } else {
          console.log(`Data inserted successfully into ${sheetName}:`, data);
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
