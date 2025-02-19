import { BsBoxArrowUpRight } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function ReportItem({ report }) {
  const router = useRouter();

  const routeToGenerateReport = () => {
    window.open(`/generatereport?uuid=${report.uuid}`, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-4 md:gap-6">
        <div className="text-4xl hidden md:block">📈</div>
        <div className="w-full">
          {/* Mobile view */}
          <div className="flex justify-between items-center md:hidden">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📈</div>
              <div className="flex flex-col">
                <p className="text-sm">Min Coverage</p>
                <p className="font-bold text-md">
                  {report?.additionalCoverNeeded}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(report?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={routeToGenerateReport}
              className="text-green-500 flex items-center gap-2"
            >
              <BsBoxArrowUpRight />
              View Report
            </button>
          </div>

          {/* Desktop view */}
          <div className="hidden md:grid grid-cols-6 gap-4">
            <div className="flex flex-col">
              <p className="text-sm">Insurance Type</p>
              <p className="font-bold text-md">Term Insurance</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Members</p>
              <p className="font-bold text-md">{report?.name}</p>
            </div>
            {/* <div className="flex flex-col">
              <p className="text-sm">Cover Type</p>
              <p className="font-bold text-md">Individual</p>
            </div> */}
            <div className="flex flex-col">
              <p className="text-sm">Min Coverage</p>
              <p className="font-bold text-md">
                {report?.additionalCoverNeeded}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Retirement Age</p>
              <h4 className="font-bold text-md">{report?.retirementAge}</h4>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Created On</p>
              <p className="font-bold text-md">
                {new Date(report?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop button - hidden on mobile */}
      <button
        onClick={routeToGenerateReport}
        className="hidden md:flex text-green-500 items-center gap-0 mt-4 md:mt-0"
      >
        <BsBoxArrowUpRight />
        View Report
      </button>
    </div>
  );
}
