import React from "react";
import { FaFileAlt, FaPhoneAlt, FaFolderOpen, FaWallet } from "react-icons/fa";
import AdvisorProfileSection from "./AdvisorProfileSection";

const ReportSection = ({ report }) => {
  return (
    <>
      {/* 1st section */}
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
              {report?.termInsuranceAmount === ""
                ? "₹ 0"
                : report?.termInsuranceAmount}
            </p>
          </div>
        </div>
        <p className=" mt-2 text-sm font-bold">
          Ensure Your Family's Financial Security with Term Insurance
        </p>
        <div className="mt-2 text-sm text-gray-600">
          <ul className="list-disc pl-4 space-y-2">
            <li>
              A term plan safeguards your family's lifestyle and goals, even if
              you're not around. By investing in a term plan, your nominee can
              invest the sum of Death Maturity in Basic Fixed Deposit (6-7%
              interest) to cover day-to-day expenses for the next 15 years. The
              principal can also help fulfill key goals like child education,
              loan repayment, and marriage.
            </li>
            <li>
              With adequate coverage, you can rest easy knowing that your family
              won't face financial stress, regardless of the circumstances.
            </li>
          </ul>
        </div>
      </section>
      {/* 2nd section */}
      <section>
        <h2 className="text-md font-bold mb-4">
          2. Additional Health Insurance cover your family needs
        </h2>
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="text-2xl font-bold border-b-4 border-green-600 mr-8">
              {report?.additionalHealthCoverNeeded || "₹0"}
            </div>
            <p className="text-gray-600 text-xs ">
              Minimum Sum Insured cover your family needs{" "}
              {report?.additionalHealthCoverNeeded || "₹ 0"} Cover you already
              have{" "}
              {report?.healthInsuranceAmount === ""
                ? "₹ 0"
                : report?.healthInsuranceAmount}{" "}
              <br />
              Do Port/Switch Your Existing Old Insurance to Latest and Best One.
            </p>
          </div>
        </div>
        <p className=" mt-2 text-sm font-bold">
          Why Health Insurance is Essential
        </p>
        <div className="mt-2 text-sm text-gray-600">
          <ul className="list-disc pl-4 space-y-2">
            <li>
              The Covid-19 pandemic has shown how unpredictable medical
              emergencies can be, potentially leading to financial strain.
              Without health insurance, your savings and wealth could be at risk
              during a medical crisis. Based on your income, a minimum cover of
              {report?.additionalHealthCoverNeeded || " ₹ 0"} is recommended
            </li>
          </ul>
        </div>
      </section>
      {/* 3rd section */}
      <section>
        <h2 className="text-md font-bold mb-4">
          3. You should keep your Term Insurance cover until
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
          term insurance cover up to 100 years of Age.
        </p>
      </section>
      {/* 4th section */}
      <section>
        <h2 className="text-md font-bold mb-4">
          4. Plan how your nominee will receive the claim amount
        </h2>
        <div className="bg-blue-100 flex flex-col md:flex-row items-center gap-2 p-6 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold ">
              {report?.nomineeReaction ===
              "Will Be Able To Manage It Confidently - Without A Sweat"
                ? "Fixed Lump Sum "
                : "Lumpsum + Monthly Income payout option"}
            </div>
            <p className="text-gray-600 text-xs"></p>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {report?.nomineeReaction ===
          "Will Be Able To Manage It Confidently - Without A Sweat" ? (
            <p>
              Based on your answers, we recommend that you opt for{" "}
              <span className="font-bold">Fixed Lump Sum.</span> This option
              will give your nominee one large payout on your death.
            </p>
          ) : (
            <p>
              Based on your answers, we recommend that you opt for{" "}
              <span className="font-bold">
                Lumpsum + Monthly Income payout option.
              </span>{" "}
              This option will break the amount payable into one large payout on
              death, and then a monthly income every year.
            </p>
          )}
        </p>
      </section>
      {/* 5th section */}
      <section>
        <h2 className="text-md font-bold mb-4">5. Build an Emergency Fund</h2>
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="text-2xl font-bold border-b-4 border-green-600">
              {report?.emergencyFundAmount || "₹ 0"}
            </div>
            <p className="text-gray-600 text-xs">
              Most of us have fixed monthly commitments like EMIs, Household
              Expenses, Fuel costs, Rentals etc.
            </p>
          </div>
        </div>
        <p className=" mt-2 text-sm font-bold">Analysis</p>
        <div className="mt-2 text-sm text-gray-600">
          <ul className="list-disc pl-4 space-y-2">
            <li>
              You should have at least 3 to 6 months of backup as an emergency
              fund. You are prepared for this challenge, that's very smart. Very
              often wealth created over a long period of time gets eroded
              overnight during unforeseen financial emergencies. Be prepared
              always
            </li>
            <li>
              Covid-19 taught us that sudden loss of income can be more common
              than ever. An emergency fund allows you to live for a few months
              if you lose your income.
            </li>
          </ul>
        </div>
      </section>
      {/* 6th section children education inflation */}
      <section>
        <h2 className="text-md font-bold mb-4">
          6. Build fund for child education
        </h2>
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-start mr-4">
              <div className="text-sm text-gray-600">
                Current Cost: {report?.educationExpenses || "0"}
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Future Cost: {"   "}
                <span className="text-2xl font-bold border-b-4 border-green-600">
                  {report?.educationInflation || "0"}
                </span>
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-gray-600 text-xs">
                This Is the future cost that could rise by the time your child
                is ready for higher education with an estimated 6% p.a
                inflation.
              </p>
            </div>
          </div>
        </div>
        <p className=" mt-2 text-sm font-bold">Analysis</p>
        <div className="mt-2 text-sm text-gray-600">
          <ul className="list-disc pl-4 space-y-2">
            <li>
              Education costs tend to rise faster than general inflation. To
              avoid the burden of loans, debts, or depleting your life savings,
              it's crucial to start planning and allocating funds now.
            </li>
            <li>
              By setting up a dedicated savings or investment plan today, you
              can ensure that you provide the best education for your child
              without financial stress in the future.
            </li>
          </ul>
        </div>
      </section>

      {/* 7th section children wedding inflation */}
      <section>
        <h2 className="text-md font-bold mb-4">
          7. Build fund for child Wedding
        </h2>
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-start mr-4">
              <div className="text-sm text-gray-600">
                Current Cost: {report?.weddingExpenses || "0"}
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Future Cost: {"   "}
                <span className="text-2xl font-bold border-b-4 border-green-600">
                  {report?.weddingInflation || "0"}
                </span>
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-gray-600 text-xs">
                This Is the future cost that could rise by the time your child
                is ready for their big day with an estimated 6% p.a inflation.
              </p>
            </div>
          </div>
        </div>
        <p className=" mt-2 text-sm font-bold">Analysis</p>
        <div className="mt-2 text-sm text-gray-600">
          <ul className="list-disc pl-4 space-y-2">
            <li>
              Wedding expenses can be substantial. To avoid taking on loans,
              accumulating debts, or draining your life savings, it's important
              to start planning and allocating funds now
            </li>
            <li>
              By setting up a dedicated savings or investment plan today, you
              can ensure a memorable and beautiful wedding for your child
              without financial stress. Speak to an advisor to structure a
              wedding fund that grows with inflation, securing a joyful and
              worry-free celebration in the future.
            </li>
          </ul>
        </div>
      </section>

      {/* 8th section expenses inflation */}
      <section>
        <h2 className="text-md font-bold mb-4">8. Build fund for Retirement</h2>
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-start mr-4">
              <div className="text-sm text-gray-600">
                Current Cost:{" "}
                {report?.knowsLivingExpenses
                  ? report?.monthlyExpenses
                  : report?.totalMonthlyExpenses || "0"}
              </div>
              <div className="text-sm text-gray-600">
                Future Cost: {report?.monthlyExpensesInflation || "0"} per month
              </div>

              <p className=" text-gray-600 mt-2 text-2xl font-bold border-b-4 border-green-600">
                {report?.retirementMonthlyExpensesInflation || "0"}
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-gray-600 text-xs">
                Total Corpus/funds you need at the age of {report?.age} in order
                to maintain your current lifestyle by Doing Monthly Systematic
                Withdrawal Plan (SWP). The figure is calculated using your
                current spendings and the average inflation rate in India
              </p>
            </div>
          </div>
        </div>
        <p className=" mt-2 text-sm font-bold">Analysis</p>
        <div className="mt-2 text-sm text-gray-600">
          <ul className="list-disc pl-4 space-y-2">
            <li>
              Retirement income plans are often unpredictable due to
              uncertainties like longevity and market fluctuations. To ensure
              financial security, it's essential to consider a lifetime annuity
              with inflation protection, which provides guaranteed monthly or
              annual income for life. Consult with your financial advisor about
              available annuity plans
            </li>
            <li>
              A key retirement goal is to be debt-free by age 65. This includes
              clearing credit card debt, car loans, and mortgages. Many parents
              take loans later in life for children's education or weddings, but
              this should be avoided to ensure a secure retirement.
            </li>
          </ul>
        </div>
      </section>

      {/* 9th section */}
      <section>
        <h2 className="text-md font-bold mb-4">
          9. Choose the Following add-on Ridders
        </h2>
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-2">
            {/* <div className="text-2xl font-bold border-b-4 border-green-600">
              {report?.emergencyFund || "₹ 0"}
            </div> */}
            <p className="text-gray-600 text-xs font-bold">
              Critical Illness & Waiver of Premium
            </p>
          </div>
        </div>
        <p className=" mt-2 text-sm font-bold">Analysis</p>
        <div className="mt-2 text-sm text-gray-600">
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <span className="font-bold">Critical Illness:</span> A serious
              disease can impact your earnings and put a big dent in your
              savings. A Critical Illness rider can help you and your family
              sail through that financial mess, without hassle. Riders are
              slightly restrictive but more cost-efficient than standalone
              critical illness plans.
            </li>
            <li>
              <span className="font-bold">Waiver of Premium:</span> In case you
              suffer from a serious disease or disability, you'll not have to
              pay your remaining premiums and keep the cover until end of the
              term.
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-6 border-2 border-green-300 rounded-lg">
        <AdvisorProfileSection flow={"horizontal"} />
      </div>
      <section className="border-2 border-green-300 p-4 rounded-lg mt-6">
        <h2 className="text-lg font-bold text-green-600 mb-4">
          Other Recommendations
        </h2>

        {/* Recommendation 1 */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">
            1. Buy your policy under the Married Women's Property Act
          </h3>
          <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
            <li>
              The MWP Act helps you secure your claim payout, and give your wife
              absolute rights to your claim amount. No other family member, bank
              or lender can claim it.
            </li>
            <li>
              Request for the MWP Annexure from the insurer while filling the
              proposal form itself.
            </li>
            <li>
              Psst... This customization is irrevocable. Even you cannot change
              the nominee once this deal is sealed. (Even in case of a divorce)
            </li>
          </ul>
        </div>

        {/* Recommendation 2 */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">2. Have a Monthly SIP</h3>
          <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
            <li>
              In Today's Modern world, It's a must to save at least 5% in SIP.
              You have been doing this and it can benefit you in long run.
            </li>
            <li>
              Compared to traditional fixed deposits or recurring deposits, SIP
              provides double the returns. SIP provides you with tremendous
              flexibility, it can save tax if invested in ELSS, it has high
              liquidity and hence can be used as an emergency fund as well, the
              returns are much higher and can help you beat inflation. If you
              stay invested for the long term, the compounding effect makes your
              returns much higher.
            </li>
          </ul>
        </div>

        {/* Recommendation 3 */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">
            3. Save at least 15% of your income
          </h3>
          <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
            <li>
              Not saving 15% per month will adversely affect your financial
              health. Your Goals may not be achieved, Your future may be
              uncertain and financial emergencies may pull you down.
            </li>
            <li>
              Investing a set amount every month inculcates the habit of saving
              in an individual. Moreover, this also motivates one to look for
              ways to save more by controlling their expenses. If you can
              achieve to save more than 15% each month, it's a triple advantage
              as you get to set aside an investment amount, save for
              emergencies, as well look for ways to cut down on expenses.
            </li>
            <li>
              Ensure that at least 70% of this saved amount is invested in
              financial instruments. Dedicate a portion of these investments to
              your financial goals.
            </li>
          </ul>
        </div>

        {/* Recommendation 4 */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">4. Build more assets</h3>
          <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
            <li>
              Commercial real estate is one of the best ways to earn regular
              passive income. The rental received takes care of inflation and
              also allows you to earn additional gains, the long-term property
              appreciation is the double benefit. This passive income shall
              allow you to have more savings which could be aligned to financial
              goals like your retirement plan or child's education/marriage.
            </li>
            <li>
              70% of the clients we serve don't have this investment. You are
              among them! If planned properly you can own a commercial property
              in the next 5 years and benefit from it for the next 20 years.
            </li>
          </ul>
        </div>

        {/* Recommendation 5 */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">
            5. Have a Personal Accident Plan
          </h3>
          <ul className="list-[lower-alpha] pl-6 space-y-2 text-gray-600 text-sm">
            <li>
              If you've had an accident that has led to disability or you've
              been diagnosed with a critical illness, chances are you'll be
              unable to work for quite some time. In such a scenario, insurance
              with critical illness and disability coverage can replace a
              portion of your income. You can use the proceeds to pay for your
              most essential expenses including food, utility bills, household
              supplies and child care.
            </li>
            <li>
              You DON'T have a disability insurance plan for you and that's not
              good. We strongly suggest you consult our expert to know more
              about this plan
            </li>
          </ul>
        </div>
      </section>
      {/* Suggested customizations */}
      {/* <section className="border-2 border-green-300 p-4 rounded-lg mt-6">
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
      </section> */}
      {/* Gimmicks you should be wary of */}
      {/* <section className="border-2 border-yellow-300 p-4 rounded-lg mt-6">
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
      </section> */}
      {/* Things you cannot ignore when you are buying the plan */}
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
