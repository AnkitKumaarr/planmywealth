import React from "react";
import { FaFileAlt, FaPhoneAlt, FaFolderOpen, FaWallet } from "react-icons/fa";
import AdvisorProfileSection from "./AdvisorProfileSection";

const ReportSection = ({ report }) => {
  return (
    <>
      <section>
        <h2 className="text-md font-bold mb-4">
          1. Additional Term Insurance cover your family needs
        </h2>
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="text-2xl font-bold border-b-4 border-green-600">
              {report?.additionalCoverNeeded}
            </div>
            <p className="text-gray-600 text-xs">
              Minimum Term Insurance cover your family needs{" "}
              {report?.additionalCoverNeeded} - Cover you already have{" "}
              {report?.finalSavingAmount}
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          This cover will ensure their lifestyle, their goals are never
          disrupted.
        </p>
      </section>
      <section>
        <h2 className="text-md font-bold mb-4">
          2. You should keep your cover until
        </h2>
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="text-2xl font-bold border-b-4 border-green-600">
              {report?.age}yrs
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-gray-600 text-xs">
                You should stop your term insurance cover once you have or
                accumulated enough wealth to take care fulfilled your financial
                responsibilities, of your family's future expenses.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Note, you will pay ~5% extra premium for every year you extend your
          term insurance cover
        </p>
      </section>
      <section>
        <h2 className="text-md font-bold mb-4">
          3. Plan how your nominee will receive the claim amount
        </h2>
        <div className="bg-blue-100 flex flex-col md:flex-row items-center gap-2 p-6 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold ">{report?.nomineeReaction}</div>
            <p className="text-gray-600 text-xs"></p>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Based on your answers, we recommend that you opt for [lumpsum + income
          payout option]. This option will break the amount payable into one
          large payout on death, and then a monthly income every year.
        </p>
      </section>
      <div className="mt-6 border-2 border-green-300 rounded-lg">
        <AdvisorProfileSection flow={"horizontal"} />
      </div>
      <section className="border-2 border-green-300 p-4 rounded-lg mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <h2 className="text-lg font-bold text-green-600 mb-4">
            Suggested customizations
          </h2>
          <p className="text-gray-600 text-xs mb-4 font-bold text-green-600">
            PEOPLE LIKE YOU OPT FOR THESE ADDITIONAL CUSTOMIZATIONS
          </p>
        </div>
        <div className=" p-4 rounded-lg mb-4">
          <h3 className="text-md font-semibold">Payment Mode</h3>
          <div className="bg-blue-100 flex flex-col md:flex-row justify-between items-center p-6 rounded-lg mt-2">
            <p className="font-bold flex-1">Monthly Mode / Annual Mode</p>
            <p className="text-gray-600 flex-1 text-xs">
              Don't rely on just your memory. Put standing instructions on your
              primary bank account to ensure auto-debit of premiums.
            </p>
          </div>
          <p className="text-gray-600 text-xs mt-2">
            More than 70% of term insurance buyers opt for the monthly premium
            option. But this is pretty much a personal preference. Overall,
            monthly premiums might cost you 5-8% more than annual premiums.
          </p>
        </div>

        <div className=" p-4 rounded-lg mb-4">
          <h3 className="text-md font-semibold">Payment Mode Term</h3>
          <div className="bg-blue-100 flex flex-col md:flex-row justify-between items-center p-6 rounded-lg mt-2">
            <p className="font-bold flex-1 pr-4 ">
              Based on our research, people like you opt for 'Regular Pay'
            </p>
            <p className="text-gray-600 text-xs flex-1">
              Of course, whether you want to fast track your premium payments,
              or opt for regular premium is a personal choice.
            </p>
          </div>
        </div>

        <div className=" p-4 rounded-lg">
          <h3 className="text-md font-semibold">
            Opt for Accidental Death Benefit Rider.
          </h3>
          <div className="bg-blue-100 flex flex-col md:flex-row justify-between items-center p-5 rounded-lg mt-2">
            <p className="font-bold flex-1">
              Opt for the maximum cover available to you
            </p>
            <p className="text-gray-600 text-xs flex-1">
              Pays an additional amount if your death happens because of an
              accident.
            </p>
          </div>

          <p className="text-gray-600 text-xs mt-4">
            Based on the information provided, you may be eligible only for ₹ 25
            lakh and not the cover ₹ 24.0 crore recommended by us in this
            report. You can compensate this gap by opting for an Accidental
            Death Benefit Rider. This way your family gets the additional
            amount, at least in case of an accidental death.
          </p>
        </div>
      </section>
      <section className="border-2 border-yellow-300 p-4 rounded-lg mt-6">
        <div className="flex items-center  mb-4">
          <h2 className="text-lg font-bold text-yellow-600">
            Gimmicks you should be wary of
          </h2>
        </div>
        <div className="p-4">
          <h3 className="text-md font-semibold">
            Buying based on Claim Settlement Ratio
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Does not tell you anything about the claims experience with the
            insurance company. You must look at metrics that measure the
            insurer's speed & quality of service.
          </p>
          <h3 className="text-md font-semibold">
            Buying based on 1 Day Claim Settlement Guarantee - Why?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Looks interesting, but comes with too many fineprint, that makes the
            benefit not really useful. For instance, most insurers honour the
            1-Day guarantee only after your policy completes three years - the
            threshold after which insurers cannot investigate or dispute the
            claim anyway. (u/s 45 of the Insurance Act) Read more about this
            here{" "}
            <a href="#" className="text-green-600">
              The Fine Print behind 24 hour Claim Settlement Guarantee
            </a>
          </p>
          <h3 className="text-md font-semibold">
            Return of Premium Plans (TROP)
          </h3>
          <p className="text-gray-600 text-sm">
            Some sellers might sell you the concept of Term Plans with a "Return
            of Premium" in case you survive the policy duration. Do not fall for
            this. Note that most of these policies will charge you a
            significantly higher, sometimes 2X premium for this benefit, which
            is not cost-efficient. If you simply invest this additional amount
            in a safe + efficient investment instrument, you will get much
            better returns. Read more about this here{" "}
            <a href="#" className="text-green-600">
              Why Return of Premium Plans Might Not Be The Best Idea?
            </a>
          </p>
        </div>
      </section>
      <section className="mt-6" id="things-to-remember">
        <h2 className="text-2xl font-bold mb-4">
          Things you cannot ignore when you are buying the plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col items-center justify-center">
            <FaFileAlt className="text-6xl text-blue-500 mb-4" />
            <div className="flex flex-col items-center justify-center p-4">
              <h3 className="text-md font-semibold mb-2">Proposal Form</h3>
              <p className="text-gray-600 text-sm text-justify">
                Insurers reject thousands of claims each year due to wrong
                information. Don't give them that chance. Fill the proposal form
                by yourself, providing information diligently, to the best of
                your knowledge.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col items-center justify-center">
            <FaPhoneAlt className="text-6xl text-blue-500 mb-4" />
            <div className="flex flex-col items-center justify-center p-4">
              <h3 className="text-md font-semibold mb-2">
                Activate Auto Debit
              </h3>
              <p className="text-gray-600 text-sm">
                10–15% customers forget renewing their policies on time, and
                leave their families without a cover. Putting standing
                instructions for premium payments is the easiest way to ensure
                this doesn't happen to you. Also, watch out for any
                payment-failure communication from your bank.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col items-center justify-center">
            <FaFolderOpen className="text-6xl text-blue-500 mb-4" />
            <div className="flex flex-col items-center justify-center p-4">
              <h3 className="text-md font-semibold mb-2">
                Maintain Electronic Records
              </h3>
              <p className="text-gray-600 text-sm">
                Store a digital copy of the policy in an Electronic Insurance
                Account (eIA) provided by your insurer, on DigiLocker or simply
                on an online folder. This way, the policy remains accessible to
                your family members, always.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col items-center justify-center">
            <FaWallet className="text-6xl text-blue-500 mb-4" />
            <div className="flex flex-col items-center justify-center p-4">
              <h3 className="text-md font-semibold mb-2">
                Inform your nominee
              </h3>
              <p className="text-gray-600 text-sm">
                There have been numerous cases where the nominee is unaware of
                the policies taken by the deceased family member. Family members
                struggle to find the records and make claims. It is important to
                ensure that your nominee is aware of the policy as well as the
                details of the policy, where it is stored so that when the need
                arises your family can make use of your sound financial decision
                of buying a term insurance policy.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-6 border-2 border-green-300 rounded-lg">
        <AdvisorProfileSection flow={"horizontal"} />
      </div>
    </>
  );
};

export default ReportSection;
