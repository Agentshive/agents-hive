import CSVUploader from "~/components/web/upload/uploadForm";


export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Insert data to Supabase</h1>
      <CSVUploader />
    </div>
  );
}
