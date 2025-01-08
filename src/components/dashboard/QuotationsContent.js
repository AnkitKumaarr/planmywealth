import EmptyState from './EmptyState';

export default function QuotationsContent() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-2xl font-bold mb-2">Quotations</h1>
        <p className="text-black">
          Keep track of all your term & health insurance quotations.
        </p>
      </div>
      <EmptyState message="You don't have any quotations" />
    </div>
  );
} 