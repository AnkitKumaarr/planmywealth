import EmptyState from "./EmptyState";

export default function DocumentsContent() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-2xl font-bold mb-2">Documents</h1>
        <p className="text-black">
          Keep track of all your term & health insurance documents.
        </p>
      </div>
      <EmptyState message="You don't have any documents" />
    </div>
  );
} 